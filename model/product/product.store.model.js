const Joi = require("joi");
const mongoose = require("mongoose");

const ProductStoreSchema = new mongoose.Schema({
    productShop_main_id: { type: String, required: true },
    productStore_id: { type: String, required: true },
    productStore_barcode: { type: String, required: true },
    productStore_stock: { type: Number, required: true, default: 0 },
});

const ProductStores = mongoose.model("product_store", ProductStoreSchema);

const validate = (data) => {
    const schema = Joi.object({
        productShop_main_id: Joi.string().required(),
        productStore_id: Joi.string().required(),
        productStore_barcode: Joi.string().required(),
        productStore_stock: Joi.number().required().default(0),
    });
    return schema.validate(data);
};

module.exports = { ProductStores, validate };