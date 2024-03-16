const router = require("express").Router();
const member = require("../../controllers/user/member.controller");
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");

router.post("/create", auth, member.create);
router.get("/", auth, member.getMemberAll);
router.get("/:id", auth, member.getMemberById);
router.get("/tel/:id", auth, member.getMemberByTel);
router.put("/:id", auth, member.updateMember);
router.delete("/:id", auth, member.deleteMember);

module.exports = router;