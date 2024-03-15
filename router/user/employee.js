const router = require("express").Router();
const employee = require("../../controllers/user/employee.controller");
const authAdmin = require("../../lib/auth.admin");

router.post("/create", authAdmin, employee.create);
router.get("/", authAdmin, employee.getEmployeeAll);
router.get("/:id", authAdmin, employee.getEmployeeById);
router.get("/shop/:id", authAdmin, employee.getEmployeeByShopId);
router.put("/:id", authAdmin, employee.updateEmployee);
router.put("/position/:id", authAdmin, employee.updatePosition);
router.put("/delete/position/:id", authAdmin, employee.deletePosition);
router.delete("/:id", authAdmin, employee.deleteEmployee);

module.exports = router;