const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  fullName: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
    match: /^01[0-2]\d{1,8}$/,
    validate: {
      validator: (value) => {
        return User.findOne({ phone: value }).then((user) => {
          return !user;
        });
      },
      message: "Phone number is already in use",
    },
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 100,
  },
  idDoc: {
    filename: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    dateUploaded: {
      type: Date,
      default: Date.now,
    },
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verificationToken: { type: String },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
