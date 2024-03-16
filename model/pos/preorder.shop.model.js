const mongoose = require("mongoose")
const Joi = require("joi")

const PreOrderShopSchema = new mongoose.Schema({
    poshop_invoice: { type: String, required: false, default: "" },
    poshop_shop_id: { type: String, required: true },
    poshop_detail: { type: Array, required: false, default: [] },
    poshop_type_price: { type: String, required: false, default: "เงินสด" },
    poshop_total: { type: Number, required: true },
    poshop_change: { type: Number, required: true },
    poshop_discount: { type: Number, required: false, default: 0 },
    poshop_status: { type: String, required: false, default: "" },
    poshop_ref_short_id: { type: String, required: false, default: "ไม่มี" }, // อ้างอิงกรณียกเลิกบิล
    poshop_timestamp: { type: Date, required: false, default: Date.now() },
    poshop_employee: { type: String, required: false, default: "ไม่มี" },
    poshop_cutoff: { type: Boolean, required: false, default: false },
});

const PreorderShops = mongoose.model("preorder_shop", PreOrderShopSchema);

const validate = (data) => {
    const schema = Joi.object({
        poshop_invoice: Joi.string().default(""),
        poshop_shop_id: Joi.string()
            .required()
            .label("กรุณากรอกไอดีร้านที่ทำรายการด้วย"),
        poshop_detail: Joi.array().default([]),
        poshop_type_price: Joi.string().default("เงินสด"),
        poshop_total: Joi.number().required(),
        poshop_change: Joi.number().required(),
        poshop_discount: Joi.number().default(0),
        poshop_status: Joi.string().default(""),
        poshop_ref_short_id: Joi.string().default("ไม่มี"),
        poshop_timestamp: Joi.date().raw().default(Date.now()),
        poshop_employee: Joi.string().default("ไม่มี"),
        poshop_cutoff: Joi.boolean().default(true),
    });
    return schema.validate(data);
};

module.exports = { PreorderShops, validate };