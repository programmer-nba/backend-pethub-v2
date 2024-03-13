const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 0,
    upperCase: 0,
    numeric: 0,
    symbol: 0,
    requirementCount: 2,
};

const EmployeeSchema = new mongoose.Schema({
    shop_id: { type: String, require: true },
    prefix: { type: String, require: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    tel: { type: String, require: true },
    username: { type: String, require: true },
    password: { type: String, require: true },
    position: { type: String, require: true },
    type: { type: Array, required: false, default: [] },
    status: { type: Boolean, require: false, default: true },
});

EmployeeSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id, name: this.first_name, row: "employee", position: this.position },
        process.env.JWTPRIVATEKEY,
        {
            expiresIn: "1h",
        }
    );
    return token;
};


const Employees = mongoose.model("employee", EmployeeSchema);

const validate = (data) => {
    const schema = Joi.object({
        shop_id: Joi.string().required().label("กรุณากรอกไอดีสาขา"),
        prefix: Joi.string().required().label("กรุณากรอกคำนำหน้าชื่อ"),
        first_name: Joi.string().required().label("กรุณากรอกชื่อ"),
        last_name: Joi.string().required().label("กรุณากรอกนามสกุล"),
        username: Joi.string().required().label("กรุณากรอกไอดีผู้ใช้งาน"),
        tel: Joi.string().required().label("กรุณากรอกเบอร์โทรศัพท์"),
        password: passwordComplexity(complexityOptions)
            .required()
            .label("admin_password"),
        position: Joi.string().required().label("กรุณากรอกระดับผู้ใช้งาน"),
    });
    return schema.validate(data);
};

module.exports = { Employees, validate };