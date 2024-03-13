const router = require("express").Router();
const admins = require("../../controllers/user/admin.controller");
const authAdmin = require("../../lib/auth.admin");

router.post("/create", authAdmin, admins.create);
router.get("/", authAdmin, admins.getAdminAll);
router.get("/:id", authAdmin, admins.getAdminById);
router.put("/:id", authAdmin, admins.updateAdmin);
router.delete("/:id", authAdmin, admins.deleteAdmin);

module.exports = router;