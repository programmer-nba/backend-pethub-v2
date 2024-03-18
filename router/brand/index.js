const router = require("express").Router();
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");
const Brand = require("../../controllers/brand/brand.controller");

// Brand
router.post("/create", authAdmin, Brand.create);
router.get("/all", auth, Brand.getBrandAll);
router.get("/:id", auth, Brand.getBrandById);
router.put("/:id", authAdmin, Brand.updateBrand);
router.delete("/:id", authAdmin, Brand.deleteBrand);

module.exports = router;