const { Products, validate } = require("../../model/product/product.model");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            const product = await Products.findOne({ product_barcode: req.body.product_barcode });
            if (product) {
                return res.status(403).send({ status: false, message: "สินค้านี้มีในระบบแล้ว" });
            } else {
                await new Products({
                    ...req.body,
                }).save();
                return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true });
            }
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getProductAll = async (req, res) => {
    try {
        const product = await Products.find();
        if (product) {
            return res
                .status(200)
                .send({ message: "ดึงข้อมูลสำเร็จ", status: true, data: product });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงข้อมูลไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};


exports.getProductById = async (req, res) => {
    try {
        const product = await Products.findOne({ _id: req.params.id });
        if (product) {
            return res
                .status(200)
                .send({ message: "ดึงข้อมูลสำเร็จ", status: true, data: product });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงข้อมูลไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getByBarcode = async (req, res) => {
    try {
        const barcode = req.params.barcode;
        const product = await Products.findOne({ product_barcode: barcode });
        if (product) {
            return res.status(200).send({ status: true, data: product });
        } else {
            return res
                .status(400)
                .send({ status: false, message: "ไม่พบข้อมูลสินค้า" });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด" });
    }
};


exports.updateProduct = async (req, res) => {
    try {
        const product = await Products.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false, });
        if (product) {
            return res
                .status(200)
                .send({ message: "แก้ไขข้อมูลสำเร็จ", status: true });
        } else {
            return res
                .status(500)
                .send({ message: "แก้ไขข้อมูลไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Products.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).send({ status: false, message: "ไม่พบข้อมูล" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ลบข้อมูลสำเร็จ" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};
