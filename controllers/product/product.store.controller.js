const { ProductShops, validate } = require("../../model/product/product.shop.model");


exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            const product = await new ProductShops({
                ...req.body,
            });
            product.save();
            return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true, data: product });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getProductStoreAll = async (req, res) => {
    try {
        const product = await ProductShops.find();
        if (product) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: product });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getProductStoreById = async (req, res) => {
    try {
        const product = await ProductShops.findOne({ _id: req.params.id });
        if (product) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: product });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updateProductStore = async (req, res) => {
    try {
        const product = await ProductShops.findByIdAndUpdate(req.params.id, req.body, {
            useFindAndModify: false,
        });
        if (product) {
            return res
                .status(200)
                .send({ message: "แก้ไขข้อมูลประเภทสินค้าสำเร็จ", status: true });
        } else {
            return res
                .status(500)
                .send({ message: "แก้ไขข้อมูลประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.deleteProductStore = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await ProductShops.findByIdAndDelete(id, {
            useFindAndModify: false,
        });
        if (!product) {
            return res.status(404).send({ status: false, message: "ไม่พบประเภทสินค้า" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ลบข้อมูลประเภทสินค้าสำเร็จ" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.findByShopId = async (req, res) => {
    const id = req.params.id;
    try {
        ProductShops.find({ productShop_id: id })
            .then((data) => {
                if (!data)
                    res
                        .status(404)
                        .send({ message: "ไม่สามารถหารายงานนี้ได้", status: false });
                else res.send({ data, status: true });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "มีบางอย่างผิดพลาด",
                    status: false,
                });
            });
    } catch (error) {
        res.status(500).send({
            message: "มีบางอย่างผิดพลาด",
            status: false,
        });
    }
};

exports.findByStoreId = async (req, res) => {
    const id = req.params.id;
    try {
        ProductShops.find({ productStore_id: id })
            .then((data) => {
                if (!data)
                    res
                        .status(404)
                        .send({ message: "ไม่สามารถหารายงานนี้ได้", status: false });
                else res.send({ data, status: true });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "มีบางอย่างผิดพลาด",
                    status: false,
                });
            });
    } catch (error) {
        res.status(500).send({
            message: "มีบางอย่างผิดพลาด",
            status: false,
        });
    }
};