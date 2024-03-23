const router = require("express").Router();
const employee = require("../../controllers/user/employee.controller");
const authAdmin = require("../../lib/auth.admin");
const auth = require("../../lib/auth");

router.post("/create", auth, employee.create);
router.get("/", auth, employee.getEmployeeAll);
router.get("/:id", auth, employee.getEmployeeById);
router.get("/shop/:id", auth, employee.getEmployeeByShopId);
router.put("/:id", auth, employee.updateEmployee);
router.put("/position/:id", auth, employee.updatePosition);
router.put("/delete/position/:id", auth, employee.deletePosition);
router.delete("/:id", auth, employee.deleteEmployee);

module.exports = router;