const Joi = require("joi");
const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    name: { type: String, required: true, default: "ไม่มีชื่อแบรนด์" }, //ชื่อประเภทสินค้า

});

const Brands = mongoose.model("brand", BrandSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("กรุณากรอกชื่อแบรนด์สินค้า"),
    });
    return schema.validate(data);
};

module.exports = { Brands, validate };
