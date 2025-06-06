const router = require("express").Router();
const { secureAPI } = require("../../utils/secure");
const resumeController = require("./resume.controller");

router.get("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const { page, limit, title } = req.query;

    const search = { title };
    const userId = req.currentUser;
    const result = await resumeController.list({ page, limit, search, userId });
    res.json(result);
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});
router.post("/", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const payload = req.body;
    payload.user = req.currentUser;
    await resumeController.create(payload);
    res.json({ data: "Resume Added" });
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});
router.get("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.currentUser;
    const result = await resumeController.getById({ id, currentUser: user });
    res.json({ data: result });
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});
router.put("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = req.currentUser;
    const result = await resumeController.updateById({
      id,
      currentUser: user,
      payload: req.body,
    });
    res.json({ data: result });
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});
router.delete("/:id", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    const result = await resumeController.remove({
      id: req.params.id,
      currentUser: req.currentUser,
    });
    res.json(result);
  } catch (e) {
    next({ err: e.message, status: 500 });
  }
});
module.exports = router;
