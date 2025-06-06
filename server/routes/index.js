const router = require("express").Router();
const samples = require("../modules/samples/sample.route");
const userRouter = require("../modules/users/user.route");
const authRouter = require("../modules/auth/auth.route");
const resumeRouter = require("../modules/resumes/resume.route");
const aiHelperRoute = require("../modules/ai/ai.route");
router.get("/", (req, res, next) => {
  try {
    res.json({ data: "API is working properly" });
  } catch (err) {
    next({ err: e.message, status: 500 });
  }
});
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/samples", samples);
router.use("/api/v1/resumes", resumeRouter);
router.use("/api/v1/assistant", aiHelperRoute);
module.exports = router;
