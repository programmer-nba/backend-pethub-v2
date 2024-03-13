const mongoose = require("mongoose");
const Joi = require("joi");

const ShopSchema = new mongoose.Schema({
    shop_name: { type: String, required: true }, //ชื่อสาขา
    shop_number: { type: String, required: true }, //รหัสสาขา
    shop_address: { type: String, required: true }, //ที่อยู่
    shop_subdistrict: { type: String, required: true }, //ตำบล
    shop_district: { type: String, required: true }, //อำเภอ
    shop_province: { type: String, required: true }, //จังหวัด
    shop_postcode: { type: String, required: true }, //รหัสไปรษณีย์
    shop_status: { type: Boolean, required: false, default: true },
    shop_status_tax: { type: String, required: false, default: "ไม่มี" },
    shop_tax_name: { type: String, required: false, default: "ไม่มี" },
    shop_tax_number: { type: String, required: false, default: "ไม่มี" },
    shop_tax_address: { type: String, required: false, default: "ไม่มี" },
    shop_tax_phone: { type: String, required: false, default: "ไม่มี" },
});

const Shops = mongoose.model("shop", ShopSchema);

const validate = (data) => {
    const schema = Joi.object({
        shop_name: Joi.string().required().label("กรุณากรอกชื่อร้านด้วย"),
        shop_number: Joi.string().required().label("กรุณากรอกรหัสร้านด้วย"),
        shop_address: Joi.string().required().label("กรุณากรอกที่อยู่ร้านด้วย"),
        shop_subdistrict: Joi.string().required().label("กรุณากรอกตำบลด้วย"),
        shop_district: Joi.string().required().label("กรุณากรอกอำเภอด้วย"),
        shop_province: Joi.string().required().label("กรุณากรอกจังหวัดด้วย"),
        shop_postcode: Joi.string().required().label("กรุณากรอกรหัสไปรษณีย์ด้วย"),
        shop_status: Joi.boolean().default(true),
        shop_status_tax: Joi.string().default("ไม่มี"), // ลงทะเบียนพาณิย์, เป็นผู้เสียภาษี
        shop_tax_name: Joi.string().default("ไม่มี"), // ชื่อผู้ประกอบการ, ชื่อผู้ลงทะเบียนผู้เสียภาษี
        shop_tax_number: Joi.string().default("ไม่มี"), // เลขผู้เสียภาษี
        shop_tax_address: Joi.string().default("ไม่มี"), //
        shop_tax_phone: Joi.string().default("ไม่มี"),
    });
    return schema.validate(data);
};

module.exports = { Shops, validate };