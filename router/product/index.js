const router = require("express").Router();
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");
const Product = require("../../controllers/product/product.controller");
const Category = require("../../controllers/product/category.controller");
const Type = require("../../controllers/product/type.controller");

// Product
router.post("/create", authAdmin, Product.create);
router.get("/all", auth, Product.getProductAll);
router.get("/:id", auth, Product.getProductById);
router.get("/:barcode", auth, Product.getByBarcode);
router.put("/:id", authAdmin, Product.updateProduct);
router.delete("/:id", authAdmin, Product.deleteProduct);

// Category
router.post("/category/create", authAdmin, Category.create);
router.get("/category/all", auth, Category.getCategoryAll);
router.get("/category/:id", auth, Category.getCategoryById);
router.put("/category/:id", authAdmin, Category.updateCategory);
router.delete("/category/:id", authAdmin, Category.deleteCategory);

// Type
router.post("/type/create", authAdmin, Type.create);
router.get("/type/all", auth, Type.getTypeAll);
router.get("/type/:id", auth, Type.getTypeById);
router.put("/type/:id", authAdmin, Type.updateType);
router.delete("/type/:id", authAdmin, Type.deleteType);

module.exports = router;