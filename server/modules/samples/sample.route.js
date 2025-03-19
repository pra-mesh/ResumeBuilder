const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json({ data: "Success" });
});
module.exports = router;
