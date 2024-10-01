const User = require("../models/userModel");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

let transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
    throw new Error("Failed to connect to Gmail SMTP server");
  } else {
    console.log("Gmail SMTP server is ready to take messages");
    console.log(success);
  }
});

const sendVerificationEmail = async (user, token) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: user.email,
    subject: "Verify your account",
    html: `<p>Hi ${user.fullName},</p>
           <p>Thanks for registering! Please verify your account by clicking the link below:</p>
           <a href="http://localhost:3000/verify-email?token=${token}">Verify your account</a>`,
  };
  console.log("Token received for verification:", token);

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent to:", user.email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Email could not be sent");
  }
};

const signUp = async (req, res, next) => {
  const { fullName, email, password, phone } = req.body;

  console.log(req.body);

  if (!fullName || !email || !password || !phone || !req.file) {
    return next(new AppError("Please add all fields", 400));
  }

  /*const userExists = await User.findOne({ email });
  if (userExists) {
    return next(new AppError("User already exists", 400));
  }*/

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phone,
      idDoc: {
        filename: req.file.filename,
        path: req.file.path,
      },
      isVerified: false,
    });

    const verificationToken = generateToken(user._id);
    user.verificationToken = verificationToken;

    const savedUser = await user.save();

    await sendVerificationEmail(savedUser, verificationToken);

    res.cookie("verificationToken", verificationToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });

    res.status(201).json({
      message: "User successfully created",
      id: savedUser._id,
      email: savedUser.email,
      fullName: savedUser.fullName,
      phone: savedUser.phone,
      isVerified: savedUser.isVerified,
      token: generateToken(savedUser._id),
    });
  } catch (err) {
    console.error(err);
    return next(new AppError("User not successfully created", 400));
  }
};

module.exports = { signUp };
