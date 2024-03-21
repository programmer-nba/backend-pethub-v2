const router = require("express").Router();
const ProductHistorys= require("../../controllers/product/product.history.controller");
const auth = require("../../lib/auth");

router.post("/", auth, ProductHistorys.create);
router.get("/", auth, ProductHistorys.getAll);
router.get("/:id", auth, ProductHistorys.getById);
router.get("/shop-id/:id", auth, ProductHistorys.getByShopId);
router.get("/stock-id/:id", auth, ProductHistorys.getByStockId);

module.exports = router;