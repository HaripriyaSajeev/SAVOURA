const Registration = require("../models/usermodel");
const Login = require("../models/loginmodel");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      phonenumber,
      gender,
      password,
      address,
    } = req.body;

    const image = req.file ? req.file.filename : "";

    // Check if email already exists
    const existingLogin = await Login.findOne({
      username: email,
    });

    const existingUser = await Registration.findOne({
      email: email,
    });

    if (existingLogin || existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered",
      });
    }

    // Save profile in users collection
    const newUser = await Registration.create({
      name,
      email,
      phonenumber,
      gender,
      address,
      image,
    });

    try {
      // Save credentials in logins collection
      await Login.create({
        username: email,
        password: password,
        usertype: "User",
      });
    } catch (loginError) {
      // Roll back profile if login creation fails
      await Registration.findByIdAndDelete(newUser._id);
      throw loginError;
    }

    return res.status(201).json({
      success: true,
      message: "Registration successful",
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

// LOGIN USER
exports.loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find login credentials
    const login = await Login.findOne({
      username: email,
    });

    if (!login || login.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const usertype = (login.usertype || "User").toLowerCase();

    // Admin can log in without a users profile
    if (usertype === "admin") {
      return res.status(200).json({
        success: true,
        message: "Login successful",
        username: login.username,
        usertype: "admin",
        userId: login._id.toString(),
      });
    }

    // Regular users must have a profile
    const user = await Registration.findOne({
      email: email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message:
          "User profile not found. Please register again or contact the administrator.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful",
      username: user.name,
      usertype: "user",
      userId: user._id.toString(),
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

exports.loginUser = exports.loginuser;

// FETCH ALL REGISTERED USERS
exports.getAllUsers = async (req, res) => {
  try {
    const users = await Registration.find().select("-password").lean();
    const logins = await Login.find()
      .select("username usertype")
      .lean();

    const userTypes = new Map(
      logins.map((login) => [
        login.username,
        login.usertype,
      ])
    );

    const result = users.map((user) => ({
      ...user,
      usertype: userTypes.get(user.email) || "User",
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Fetch users error:", error);

    return res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};

// FETCH ONE REGISTERED USER
exports.getUserById = async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const login = await Login.findOne({
      username: user.email,
    }).select("usertype");

    return res.status(200).json({
      ...user,
      usertype: login?.usertype || "User",
    });
  } catch (error) {
    console.error("Fetch user error:", error);

    return res.status(500).json({
      message: "Error fetching user",
      error: error.message,
    });
  }
};

// DELETE USER AND LOGIN DETAILS
exports.deleteUser = async (req, res) => {
  try {
    const user = await Registration.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await Registration.findByIdAndDelete(req.params.id);

    await Login.deleteOne({
      username: user.email,
    });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error("Delete user error:", error);

    return res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};