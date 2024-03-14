const Joi = require("joi")
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_barcode: { type: String, required: true },
    product_category: { type: String, required: true },
    product_detail: { type: String, required: false, default: "" },
    product_quantity: { type: Number, required: true },
    product_supply: { type: String, required: false, default: "" },
    product_band: { type: String, required: false, default: "" },
    product_cost: { type: Number, required: true }, // ต้นทุน
    product_cost_ph: { type: Number, required: true }, // ต้นทุนบริษัท
    product_retail: { type: Number, required: true }, // ขายปลีก
    product_wholesale: { type: Number, required: true }, //ขายส่ง
    product_mem_retail: { //ราคาปลีกสมาชิก
        level1: { type: Number, required: false, default: 0 },
        level2: { type: Number, required: false, default: 0 },
        level3: { type: Number, required: false, default: 0 },
        level4: { type: Number, required: false, default: 0 },
        level5: { type: Number, required: false, default: 0 },
    },
    product_mem_wholesale: { //ราคาส่งสมาชิก
        level1: { type: Number, required: false, default: 0 },
        level2: { type: Number, required: false, default: 0 },
        level3: { type: Number, required: false, default: 0 },
        level4: { type: Number, required: false, default: 0 },
        level5: { type: Number, required: false, default: 0 },
    },
    status: { type: Boolean, required: false, default: true },
});

const Products = mongoose.model("product", ProductSchema);

const validate = (data) => {
    const schema = Joi.object({
        product_name: Joi.string().required().label("กรุณากรอกชื่อสินค้า"),
        product_barcode: Joi.string().required().label("กรุณากรอกบาร์โค๊ดสินค้า"),
        product_category: Joi.string().required().label("กรุณากรอกประเภทสินค้า"),
        product_detail: Joi.string().default(""),
        product_supply: Joi.string().default(""),
        product_band: Joi.string().default(""),
        product_quantity: Joi.number().required().label("กรุณากรอกจำนวนสินค้า"),
        product_cost: Joi.number().required().label("กรุณากรอกต้นทุนสินค้า"),
        product_cost_ph: Joi.number().required().label("กรุณากรอกต้นทุนสินค้าของบริษัท"),
        product_retail: Joi.number().required().label("กรุณากรอกราคาขายปลีก"),
        product_wholesale: Joi.number().required().label("กรุณากรอกราคาขายส่ง"),
        product_mem_retail: {
            level1: Joi.number().default(0),
            level2: Joi.number().default(0),
            level3: Joi.number().default(0),
            level4: Joi.number().default(0),
            level5: Joi.number().default(0),
        },
        product_mem_wholesale: {
            level1: Joi.number().default(0),
            level2: Joi.number().default(0),
            level3: Joi.number().default(0),
            level4: Joi.number().default(0),
            level5: Joi.number().default(0),
        },
    });
    return schema.validate(data);
};

module.exports = { Products, validate }