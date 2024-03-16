const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const MemberSchema = new mongoose.Schema({
    number: { type: String, require: false, default: "" },
    prefix: { type: String, require: true },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    tel: { type: String, require: true },
    position: { type: String, require: false, default: "" },
    point: { type: Number, require: false, default: 0 },
    timestamp: { type: String, required: false },
});

const Members = mongoose.model("member", MemberSchema);

const validate = (data) => {
    const schema = Joi.object({
        number: Joi.string().default(""),
        prefix: Joi.string().required().label("กรุณากรอกคำนำหน้าชื่อ"),
        first_name: Joi.string().required().label("กรุณากรอกชื่อ"),
        last_name: Joi.string().required().label("กรุณากรอกนามสกุล"),
        tel: Joi.string().required().label("กรุณากรอกเบอร์โทรศัพท์"),
        position: Joi.string().default(""),
        point: Joi.number().default(0),
        timestamp: Joi.string(),
    });
    return schema.validate(data);
};

module.exports = { Members, validate };