const User = require("../models/userModel");
const AppError = require("./AppError");
const jwt = require("jsonwebtoken");

const verifyEmail = async (req, res, next) => {
  const { token } = req.body;
  console.log("Token received from frontend:", token);

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Decoded token:", decoded);

    const user = await User.findById(decoded.id);
    //console.log("User found:", user);

    if (!user) {
      return next(new AppError("User not found", 404));
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email already verified." });
    }

    user.verified = true;
    user.verificationToken = undefined;
    console.log(user.verified);
    await user.save();

    return res.status(200).json({ message: "Email verified successfully!" });
  } catch (err) {
    // console.error("Error in token verification:", err);
    return next(new AppError("Invalid or expired token", 400));
  }
};
module.exports = { verifyEmail };
