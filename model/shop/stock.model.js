const Joi = require("joi");
const mongoose = require("mongoose");

const StockSchema = new mongoose.Schema({
    shop_id: { type: String, required: true },
    shop_type: { type: String, required: true },
});

const Stocks = mongoose.model("stock", StockSchema);

const validate = (data) => {
    const schema = Joi.object({
        shop_id: Joi.string().required().label("กรอกไอดีสาขา"),
        shop_type: Joi.string().default("กรอกประเภทคลัง"),
    });
    return schema.validate(data);
};

module.exports = { Stocks, validate };
