const router = require("express").Router();
const stock = require("../../controllers/shop/stock.controller");
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");

// Stock
router.post("/create", authAdmin, stock.create);
router.get("/all", auth, stock.getStockAll);
router.get("/:id", auth, stock.getStockById);
router.get("/shop/:id", auth, stock.getStockByShopId);
router.put("/:id", authAdmin, stock.updateStock);
router.delete("/:id", authAdmin, stock.deleteStock);


module.exports = router;