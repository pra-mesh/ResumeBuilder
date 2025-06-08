const router = require("express").Router();

router.get("/", (req, res, _) => {
  res.json({ data: "Success" });
});
module.exports = router;
