const fs = require("fs");
const router = require("express").Router();

const authController = require("./auth.controller");
const { storage, upload } = require("../../utils/multer");

router.post("/login", async (req, res, next) => {
  try {
    const result = await authController.login(req.body);

    res.json(result);
  } catch (e) {
    next({ err: e.err, status: 500 });
  }
});
const newUpload = upload(storage("public/uploads/users"), 1000000);

router.post(
  "/register",
  newUpload.single("picture"),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.profilepic = req.file.path
          .replace("public", "")
          .replaceAll("\\", "/");
      }
      await authController.register(req.body);
      res.json({ data: "User registered successfully" });
    } catch (e) {
      fs.unlinkSync("public".concat(req.body.profilepic));
      next({ err: e, status: 500 });
    }
  }
);
router.post("/email/verify", async (req, res, next) => {
  try {
    await authController.verifyEmail(req.body);
    res.json({ data: "Email verified successfully" });
  } catch (e) {
    next(e);
  }
});

router.post("/email/resend", async (req, res, next) => {
  try {
    await authController.resendOTP(req.body);
    res.json({ data: "OTP resent." });
  } catch (e) {
    next(e);
  }
});

router.post("/refresh", async (req, res, next) => {
  try {
    const result = await authController.refreshToken(req.body);
    res.json(result);
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.post("/forget-password", async (req, res, next) => {
  try {
    await authController.forgetPassword(req.body);
    res.json({
      data: "Please check your email address for further instruction.",
    });
  } catch (e) {
    next(e);
  }
});

router.post("/forget-password/rest-password", async (req, res, next) => {
  try {
    await authController.fpResetPassword(req.body);
    res.json({ data: "Password changed successfully." });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
