const AppError = require("./AppError");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new AppError("Error: File type not allowed", 400));
    }
  },
});

const registvalidate = (req, res, next) => {
  const { phone, email } = req.body;

  const phoneRegex = /^01[0-2]\d{1,8}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!phoneRegex.test(phone)) {
    return next(
      new AppError(
        "Invalid phone number format. Expected format: +20XXXXXXXX",
        400
      )
    );
  }

  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }

  next();
};

module.exports = { registvalidate, upload };
