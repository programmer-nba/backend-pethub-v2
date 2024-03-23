const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const MemberSchema = new mongoose.Schema({
    number: { type: String, required: false },
    prefix: { type: String, required: false },
    first_name: { type: String, required: true },
    last_name: { type: String, required: false },
    iden: { type: String, required: false },
    tel: { type: String, required: false },
    email: { type: String, required: false },
    address: { type: String, required: false },
    position: {
        type: String,
        enum: ["ระดับ1", "ระดับ2", "ระดับ3", "ระดับ4", "ระดับ5"],
        required: true
    },
    type: {
        type: String,
        enum: ["ขายปลีก", "ขายส่ง", "ขายปกติ"],
        required: true
    },
    point: { type: Number, required: false, default: 0 },
    tax_number: { type: Number, required: false },
    remark: { type: String, required: false },
    timestamp: { type: Date, required: false, default: Date.now() },
});

const Members = mongoose.model("member", MemberSchema);

// const validate = (data) => {
//     const schema = Joi.object({
//         first_name: Joi.string().required().label("กรุณากรอกชื่อ"),
//         position: Joi.string().default("ระดับ 1"),
//         type: Joi.string().default("ขายปกติ"),
//         timestamp: Joi.date().default(Date.now()),
//     });
//     return schema.validate(data);
// };

module.exports = { Members };