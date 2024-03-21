const router = require("express").Router()
const invoiceShopShort = require("../../controllers/invlice.tax.controller/invoice.tax.shop.short")
const invoiceStoreOrder = require("../../controllers/invlice.tax.controller/invoice.tax.store")
const auth = require("../../lib/auth")

router.post("/shop/short", auth, invoiceShopShort.create);
router.post("/store/order", auth, invoiceStoreOrder.create);

module.exports = router;