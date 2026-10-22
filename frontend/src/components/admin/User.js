import React, { useEffect, useState } from "react";
import axios from "axios";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/user/users"
      );
      setUsers(response.data);
    } catch (err) {
      setError("Unable to fetch users. Check your backend.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/user/${id}`
      );

      setUsers((previousUsers) =>
        previousUsers.filter((user) => user._id !== id)
      );
    } catch (err) {
      alert("Unable to delete user.");
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="page-inner">
        <h3 className="fw-bold mb-3">Users</h3>

        <div className="card card-round">
          <div className="card-header">
            <h4 className="card-title">Registered Users</h4>
          </div>

          <div className="card-body">
            {loading && <p>Loading users...</p>}

            {error && <p className="text-danger">{error}</p>}

            {!loading && !error && (
              <div className="table-responsive">
                <table className="table table-bordered table-hover">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Gender</th>
                      <th>Address</th>
                      <th>User Type</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center">
                          No registered users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user._id}>
                          <td>{user.name}</td>
                          <td>{user.phonenumber}</td>
                          <td>{user.email}</td>
                          <td>{user.gender}</td>
                          <td>{user.address}</td>
                          <td>
                            {user.usertype ||
                              user.userType ||
                              user.role ||
                              "User"}
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(user._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;