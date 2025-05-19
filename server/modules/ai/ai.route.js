const { secureAPI } = require("../../utils/secure");
const { generateText } = require("./ai.controller");

const router = require("express").Router();

router.post("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    res.json(await generateText(req.body));
  } catch (e) {
    next(e);
  }
});

module.exports = router;
