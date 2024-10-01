const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id, fullName) => {
  return jwt.sign({ id, fullName }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new AppError("Invalid credentials", 401));
    }

    if (!user.verified) {
      return next(
        new AppError("Please verify your email before logging in", 403)
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new AppError("Invalid credentials", 401));
    }

    const token = generateToken(user._id);

    res.setHeader("Set-Cookie", `jwt=${token}; Path=/; HttpOnly`);

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
        verified: user.verified,
      },
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("Login failed", 500));
  }
};

module.exports = { login };
