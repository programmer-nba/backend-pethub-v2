const router = require("express").Router();
const Order = require("../../controllers/pos/order.controller");
const auth = require("../../lib/auth");

router.post("/", auth, Order.create);
router.get("/", auth, Order.findAll);
router.get("/:id", auth, Order.findById);
router.put("/:id", auth, Order.update);
router.get("/shop-id/:shop_id", auth, Order.findByShopId);
router.get("/dealer-id/:dealer_id", auth, Order.findByDealerId);
router.get("/store-id/:store_id", auth, Order.findByStoreId);
router.get('/ponba/:ponba_id', auth, Order.findByPoNbaId);

module.exports = router;