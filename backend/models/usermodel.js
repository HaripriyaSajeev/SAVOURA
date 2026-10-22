
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    phonenumber: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    gender: {
      type: String,
      required: true
    },

    image: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

const Registration = mongoose.model('user', userSchema);

module.exports = Registration;
