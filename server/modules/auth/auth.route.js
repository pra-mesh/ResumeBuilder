const fs = require("fs");
const router = require("express").Router();

const authController = require("./auth.controller");
const {
  forgetPasswordMW,
  fpResetPasswordMW,
  loginValidationMw,
  userValidationMw,
  resendOtpMW,
  refresh_tokenMW,
  verifyEmailMw,
} = require("./auth.validation");
const { storage, upload } = require("../../utils/multer");

router.post("/login", loginValidationMw, async (req, res, next) => {
  try {
    const result = await authController.login(req.body);

    res.json(result);
  } catch (e) {
    next({ err: e.message, status: 400 });
  }
});
const newUpload = upload(storage("public/uploads/users"), 1000000);

router.post(
  "/register",
  newUpload.single("picture"),
  userValidationMw,
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.profilePic = req.file.path
          .replace("public", "")
          .replaceAll("\\", "/");
      }
      await authController.register(req.body);
      res.json({ data: "User registered successfully" });
    } catch (e) {
      fs.unlinkSync("public".concat(req.body.profilePic));

      next({ err: e.message, status: 500 });
    }
  }
);

router.post("/email/verify", verifyEmailMw, async (req, res, next) => {
  try {
    await authController.verifyEmail(req.body);
    res.json({ data: "Email verified successfully" });
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});

router.post("/email/resend", resendOtpMW, async (req, res, next) => {
  try {
    await authController.resendOTP(req.body);
    res.json({ data: "OTP resent." });
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});

router.post("/refresh", refresh_tokenMW, async (req, res, next) => {
  try {
    const result = await authController.refreshToken(req.body);
    res.json(result);
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});

router.post("/forget-password", forgetPasswordMW, async (req, res, next) => {
  try {
    await authController.forgetPassword(req.body);
    res.json({
      data: "Please check your email address for further instruction.",
    });
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});

router.post(
  "/forget-password/rest-password",
  fpResetPasswordMW,
  async (req, res, next) => {
    try {
      await authController.fpResetPassword(req.body);
      res.json({ data: "Password changed successfully." });
    } catch (e) {
      next({ err: e.message, status: 500 });
    }
  }
);

module.exports = router;
