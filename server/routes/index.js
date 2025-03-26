const router = require("express").Router();
const samples = require("../modules/samples/sample.route");
const userRouter = require("../modules/users/user.route");
const authRouter = require("../modules/auth/auth.route");
router.get("/", (req, res, next) => {
  try {
    res.json({ data: "API is wroking properly" });
  } catch (err) {
    next(e);
  }
});
router.use("/api/v1/auth", authRouter);
router.use("/api/v1/users", userRouter);
router.use("/api/v1/samples", samples);
module.exports = router;
