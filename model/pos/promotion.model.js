const Joi = require("joi");
const mongoose = require("mongoose");

const PromotionSchema = new mongoose.Schema({
    promotion_name: { type: String, required: true },
    promotion_type: { type: String, enum: ['ลดราคาตามจำนวน', 'แถมตามจำนวน'], required: true },
    product_barcode: { type: Array, required: false, default: [] },
    product_price: { type: Number, required: false, default: 0 },
    product_amount: { type: Number, required: false, default: 0 },
    promotion_start: { type: Date, required: false, default: "" },
    promotion_end: { type: Date, required: false, default: "" },
    // promotion_detail: { type: String, required: false, default: "ไม่มี" },
});

const Promotions = mongoose.model("promotion", PromotionSchema);

const validate = (data) => {
    const schema = Joi.object({
        promotion_name: Joi.string().required().label("กรอกชื่อโปรโมชั่น"),
        promotion_type: Joi.string().required().label("กรอกประเภทโปรโมชั่น"),
        product_barcode: Joi.array().default([]),
        product_price: Joi.number().default(0),
        product_amount: Joi.number().default(0),
        promotion_start: Joi.date().default(""),
        promotion_end: Joi.date().default(""),
        // promotion_detail: Joi.string().default("ไม่มี"),
    });
    return schema.validate(data);
};

module.exports = { Promotions, validate }