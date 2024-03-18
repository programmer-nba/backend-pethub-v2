const Joi = require("joi");
const mongoose = require("mongoose");

const TypeSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "ไม่มีรุ่นสินค้า" }, //ชื่อประเภทสินค้า

});

const Types = mongoose.model("type", TypeSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("กรุณากรอกรุ่นสินค้า"),
    });
    return schema.validate(data);
};

module.exports = { Types, validate };
