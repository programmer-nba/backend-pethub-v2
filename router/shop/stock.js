const router = require("express").Router();
const stock = require("../../controllers/shop/stock.controller");
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");

// Stock
router.post("/create", auth, stock.create);
router.get("/all", auth, stock.getStockAll);
router.get("/:id", auth, stock.getStockById);
router.get("/shop/:id", auth, stock.getStockByShopId);
router.put("/:id", auth, stock.updateStock);
router.delete("/:id", auth, stock.deleteStock);


module.exports = router;