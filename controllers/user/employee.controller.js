const { Employees, validate } = require("../../model/user/employee.model");
const bcrypt = require("bcrypt");
const dayjs = require("dayjs");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res
                .status(400)
                .send({ status: false, message: error.details[0].message });
        }
        const user = await Employees.findOne({
            first_name: req.body.first_name,
        });
        if (user) {
            return res.status(400).send({
                status: false,
                message: "มีชื่อผู้ใช้งานนี้ในระบบเเล้ว",
            });
        } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            await new Employees({
                ...req.body,
                password: hashPassword,
            }).save();
            return res.status(200).send({ message: "สร้างข้อมูลสำเร็จ", status: true });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getEmployeeAll = async (req, res) => {
    try {
        const employee = await Employees.find();
        if (!employee) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: employee });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getEmployeeById = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employees.findById(id);
        if (!employee) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: employee });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getEmployeeByShopId = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employees.find();
        const employees = employee.filter(
            (el) => el.shop_id === id
        );
        if (!employees) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: employees });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updateEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.body) {
            return res
                .status(400)
                .send({ status: false, message: error.details[0].message });
        }
        if (!req.body.password) {
            const new_employee = await Employees.findByIdAndUpdate(id, req.body);
            if (!new_employee) {
                return res
                    .status(400)
                    .send({ status: false, message: "ไม่สามารถแก้ไขผู้ใช้งานนี้ได้" });
            } else {
                return res.send({
                    status: true,
                    message: "แก้ไขข้อมูลผู้ใช้งานเรียบร้อย",
                });
            }
        } else {
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const hashPassword = await bcrypt.hash(req.body.password, salt);
            const new_password = await Employees.findByIdAndUpdate(id, {
                ...req.body,
                password: hashPassword,
            });
            if (!new_password) {
                return res.status(400).send({
                    status: false,
                    message: "ไม่สามารถแก้ไขรหัสผ่านผู้ใช้งานนี้ได้",
                });
            } else {
                return res.send({
                    status: true,
                    message: "แก้ไขข้อมูลผู้ใช้งานเรียบร้อย",
                });
            }
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updatePosition = async (req, res) => {
    try {
        const id = req.params.id;
        const new_employee = await Employees.findById(id);
        for (let item of req.body) {
            const position = new_employee.type.find(
                (el) => el === item
            );
            if (!position) {
                new_employee.type.push(item);
            }
        }
        new_employee.save();
        return res.send({
            status: true,
            message: "เพิ่มสิทธิ์การใช้งานเรียบร้อย",
        });
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.deletePosition = async (req, res) => {
    try {
        const id = req.params.id;
        const new_employee = await Employees.findById(id);
        new_employee.type.splice(req.body.position, 1);
        new_employee.save();
        return res.send({
            status: true,
            message: "ลบสิทธิ์การใช้งานเรียบร้อย",
        });
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
}

exports.deleteEmployee = async (req, res) => {
    try {
        const id = req.params.id;
        const employee = await Employees.findByIdAndDelete(id);
        if (!employee) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res.status(200).send({ status: true, message: "ลบข้อผู้ใช้สำเร็จ" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};
