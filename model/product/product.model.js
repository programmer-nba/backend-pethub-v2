const Joi = require("joi")
const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    product_name: { type: String, required: true },
    product_barcode: { type: String, required: true },
    product_category: { type: String, required: true }, // กลุ่มสินค้า
    product_type: { type: String, required: false, default: "" }, // รุ่นสินค้า
    product_detail: { type: String, required: false, default: "" },
    // product_quantity: { type: Number, required: true },
    product_supply: { type: String, required: false, default: "" },
    product_brand: { type: String, required: false, default: "" },
    product_taste: { type: String, required: false, default: "" }, // รสชาติ
    product_size: { type: String, required: false, default: "" }, // ขนาด
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
    product_unit: {
        detail: { type: String, required: false, default: "" },
        barcode: { type: String, required: false, default: "" },
        amount: { type: Number, required: false, default: 0 }
    },
    product_status: { type: String, required: false, default: "active" },
});

const Products = mongoose.model("product", ProductSchema);

const validate = (data) => {
    const schema = Joi.object({
        product_name: Joi.string().required().label("กรุณากรอกชื่อสินค้า"),
        product_barcode: Joi.string().required().label("กรุณากรอกบาร์โค๊ดสินค้า"),
        product_category: Joi.string().required().label("กรุณากรอกประเภทสินค้า"),
        product_type: Joi.string().default(""),
        product_detail: Joi.string().default(""),
        product_supply: Joi.string().default(""),
        product_brand: Joi.string().default(""),
        product_taste: Joi.string().default(""),
        product_size: Joi.string().default(""),
        // product_quantity: Joi.number().required().label("กรุณากรอกจำนวนสินค้า"),
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
        product_unit: Joi.object({
            detail: Joi.string().default(""),
            barcode: Joi.string().default(""),
            amount: Joi.number().default(0)
        }),
        product_status: Joi.string().default("active"),
    });
    return schema.validate(data);
};

module.exports = { Products, validate }