const { secureAPI } = require("../../utils/secure");
const { generateText } = require("./ai.controller");

const router = require("express").Router();

router.post("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    res.json(await generateText(req.body));
  } catch (e) {
    console.log(e);
    next({ err: e.message, status: 400 });
  }
});

module.exports = router;
