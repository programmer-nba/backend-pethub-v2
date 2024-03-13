const router = require("express").Router();
const bcrypt = require("bcrypt");
require("dotenv").config();

const { Admins } = require("../model/user/admin.model");
const { Employees } = require("../model/user/employee.model");
const { Shops } = require("../model/shop/shop.model");
const auth = require("../lib/auth");

router.post("/login", async (req, res) => {
    try {
        const admin = await Admins.findOne({
            admin_username: req.body.username,
        });
        if (!admin) {
            await checkEmployee(req, res);
        } else {
            const validPasswordAdmin = await bcrypt.compare(
                req.body.password,
                admin.admin_password
            );
            if (!validPasswordAdmin) {
                return res.status(401).send({
                    status: false,
                    message: "รหัสผ่านไม่ถูกต้อง",
                });
            }
            const token = admin.generateAuthToken();
            const responseData = {
                name: admin.admin_name,
                username: admin.admin_username,
                level: "admin",
            };
            return res.status(200).send({
                status: true,
                token: token,
                message: "เข้าสู่ระบบสำเร็จ",
                result: responseData,
            });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "Internal Server Error" });
    }
});

const checkEmployee = async (req, res) => {
    try {
        let employee = await Employees.findOne({
            username: req.body.username,
        });
        if (!employee) {
            return res.status(401).send({
                message: "username is not find",
                status: false,
            });
        } else {
            const validPasswordPartner = await bcrypt.compare(
                req.body.password,
                employee.password
            );
            if (!validPasswordPartner)
                // รหัสไม่ตรง
                return res.status(401).send({
                    message: "password is not find",
                    status: false,
                });

            let isShop = await Shops.findOne({
                _id: employee.shop_id,
                shop_status: true,
            });
            if (!isShop) {
                return res.status(401).send({
                    message: "ไม่มีสาขาที่ออนไลน์อยู่",
                    status: false,
                });
            }
            const token = employee.generateAuthToken();
            const ResponesData = {
                name: employee.first_name,
                username: employee.username,
                shop_id: isShop._id,
                position: employee.position,
                type: employee.type,
                status: employee.status,
            };
            return res.status(200).send({
                token: token,
                message: "เข้าสู่ระบบสำเร็จ",
                result: ResponesData,
                status: true,
            });
        }
    } catch (error) {
        return res.status(500).send({ message: "Internal Server Error" });
    }
};

router.get("/me", auth, async (req, res) => {
    const { decoded } = req;
    try {
        console.log("call me", decoded);
        if (decoded && decoded.row === "admin") {
            const id = decoded._id;
            Admins.findOne({ _id: id })
                .then((item) => {
                    return res.status(200).send({
                        id: item._id,
                        name: item.admin_name,
                        username: item.admin_username,
                        level: "admin",
                    });
                })
                .catch(() =>
                    res.status(400).send({ message: "มีบางอย่างผิดพลาด", status: false })
                );
        } else if (decoded && decoded.row === "employee") {
            const id = decoded._id;
            Employees.findOne({ _id: id })
                .then((item) => {
                    return res.status(200).send({
                        name: item.first_name,
                        username: item.username,
                        level: "employee",
                        position: item.position,
                        type: item.type
                    });
                })
                .catch(() =>
                    res.status(400).send({ message: "มีบางอย่างผิดพลาด", status: false })
                );
        }
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error", status: false });
    }
})

module.exports = router;
