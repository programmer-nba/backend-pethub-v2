const Joi = require("joi");
const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
    promotion_name: { type: String, required: true },
    product_barcode: { type: String, required: true },
    product_price: { type: Number, required: true },
    product_amount: { type: Number, required: true },
    promotion_start: { type: Date, required: true, default: Date.now() },
    promotion_end: { type: Date, required: true, default: Date.now() },
    // promotion_detail: { type: String, required: false, default: "ไม่มี" },
});

const Promotions = mongoose.model("promotion", PromotionSchema);

const validate = (data) => {
    const schema = Joi.object({
        promotion_name: Joi.string().required().label("กรอกชื่อโปรโมชั่น"),
        product_barcode: Joi.string().required().label("กรอกบาร์โค๊ดสินค้า"),
        product_price: Joi.number().required().label("กรอกราคา"),
        product_amount: Joi.number().required().label("กรอกจำนวนสินค้า"),
        promotion_start: Joi.date().required().label("กรอกวันที่เริ่ม"),
        promotion_end: Joi.date().required().label("กรอกวันที่สิ้นสุด"),
        // promotion_detail: Joi.string().default("ไม่มี"),
    });
    return schema.validate(data);
};

module.exports = { Promotions, validate }