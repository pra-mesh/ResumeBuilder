const router = require("express").Router();
const userController = require("./user.controller");
const { secureAPI } = require("../../utils/secure");
const { storage, upload } = require("../../utils/multer");
const fs = require("fs");
router.post(
  "/change-password",
  secureAPI(["admin", "user"]),
  async (req, res, next) => {
    try {
      await userController.changePassword(req.currentUser, req.body);
      res.json({ data: "Password changed successfully" });
    } catch (e) {
      next(e);
    }
  }
);
const newUpload = upload(storage("public/uploads/users"), 1000000);

router.get("/profile", secureAPI(["admin", "user"]), async (req, res, next) => {
  try {
    console.log(req.currentUser);
    const result = await userController.getProfile(req.currentUser);
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.put(
  "/profile-update",
  secureAPI(["admin", "user"]),
  async (req, res, next) => {
    try {
      const result = await userController.updateProfile(
        req.currentUser,
        req.body
      );
      res.json(result);
    } catch (e) {
      next({ err: e, status: 500 });
    }
  }
);

//list users
router.get("/", secureAPI("admin"), async (req, res, next) => {
  try {
    const { page, limit, name, gender, role, email } = req.query;
    const search = { name, gender, role, email };
    const result = await userController.list({ page, limit, search });
    res.json(result);
  } catch (e) {
    next(e);
  }
});

router.get("/userReport", secureAPI("admin"), async (req, res, next) => {
  try {
    const { to, from } = req.query;
    const result = await userController.userReport({ to, from });
    res.json(result);
  } catch (e) {
    next(e);
  }
});
//add user
router.post(
  "/",
  secureAPI("admin"),
  newUpload.single("picture"),
  async (req, res, next) => {
    try {
      if (req.file) {
        req.body.profilepic = req.file.path
          .replace("public", "")
          .replaceAll("\\", "/");
      }
      const result = await userController.addUser(req.body);
      res.json(result);
    } catch (e) {
      if (req.file) fs.unlinkSync("public".concat(req.body.profilepic));
      next({ err: e.message, status: 500 });
    }
  }
);

router.get("/:id", secureAPI("admin"), async (req, res, next) => {
  try {
    const result = await userController.getByID(req.params.id);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.put("/:id", secureAPI("admin"), async (req, res, next) => {
  try {
    const result = await userController.updateUser(req.params.id, req.body);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

router.post("/reset-password", secureAPI(["admin"]), async (req, res, next) => {
  try {
    await userController.restPassword(req.body);
    res.json({ data: "Password reset successfully" });
  } catch (e) {
    next(e);
  }
});

router.patch("/:id/block", secureAPI(["admin"]), async (req, res, next) => {
  try {
    const result = await userController.blockUser(req.params.id);
    res.json({ data: result });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
