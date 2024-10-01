const express = require("express");
const router = express.Router();

const { signUp } = require("../controllers/signUpControllor");
const { login } = require("../controllers/logInControllor");

const { upload, registvalidate } = require("../utils/validation");
const { verifyEmail } = require("../utils/verifyEmail");

router.post("/signup", upload.single("idDoc"), registvalidate, signUp);
router.post("/verify-email", verifyEmail);
router.post("/login", login);

module.exports = router;
