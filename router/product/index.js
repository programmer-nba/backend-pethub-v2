const router = require("express").Router();
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");
const Product = require("../../controllers/product/product.controller");
const Category = require("../../controllers/product/category.controller");
const Type = require("../../controllers/product/type.controller");

// Product
router.post("/create", auth, Product.create);
router.get("/all", auth, Product.getProductAll);
router.get("/:id", auth, Product.getProductById);
router.get("/:barcode", auth, Product.getByBarcode);
router.put("/:id", auth, Product.updateProduct);
router.delete("/:id", auth, Product.deleteProduct);

// Category
router.post("/category/create", auth, Category.create);
router.get("/category/all", auth, Category.getCategoryAll);
router.get("/category/:id", auth, Category.getCategoryById);
router.put("/category/:id", auth, Category.updateCategory);
router.delete("/category/:id", auth, Category.deleteCategory);

// Type
router.post("/type/create", auth, Type.create);
router.get("/type/all", auth, Type.getTypeAll);
router.get("/type/:id", auth, Type.getTypeById);
router.put("/type/:id", auth, Type.updateType);
router.delete("/type/:id", auth, Type.deleteType);

module.exports = router;