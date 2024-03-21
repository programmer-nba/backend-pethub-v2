const router = require("express").Router();
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");
const pos = require("../../controllers/pos/preorder.shop.controller");

router.post("/create", auth, pos.create);
router.post("/pause", auth, pos.pause);
router.put("/:id", auth, pos.updateOrder);
router.get("/all", auth, pos.getPreorderAll);
router.get("/:id", auth, pos.getPreorderById);
router.get("/shop/:id", auth, pos.getPreorderByShopId);

module.exports = router;