const router = require("express").Router();
const promotion = require("../../controllers/pos/promotion.controller");
const auth = require("../../lib/auth");

router.post("/create", auth, promotion.create);
router.get("/all", auth, promotion.getPromotionAll);
router.get("/:id", auth, promotion.getPromotionById);
router.get("/:barcode", auth, promotion.getByBarcode);
router.put("/:id", auth, promotion.updatePromotion);
router.delete("/:id", auth, promotion.deletePromotion);

module.exports = router;