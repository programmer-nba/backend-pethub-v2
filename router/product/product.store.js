const router = require("express").Router();
const ProductStore = require("../../controllers/product/product.store.controller");
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");

// Product Store
router.post("/create", auth, ProductStore.create);
router.get("/all", auth, ProductStore.getProductStoreAll);
router.get("/:id", auth, ProductStore.getProductStoreById);
router.put("/:id", auth, ProductStore.updateProductStore);
router.delete("/:id", authAdmin, ProductStore.deleteProductStore);

module.exports = router;