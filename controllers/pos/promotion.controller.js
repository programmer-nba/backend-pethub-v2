const { Promotions, validate } = require("../../model/pos/promotion.model");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ status: false, message: error.details[0].message });
        const promotion = await new Promotions({
            ...req.body,
        });
        promotion.save();
        return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true, data: promotion });
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getPromotionAll = async (req, res) => {
    try {
        const promotion = await Promotions.find();
        if (promotion) {
            return res
                .status(200)
                .send({ message: "ดึงข้อมูลสำเร็จ", status: true, data: promotion });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงข้อมูลไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getPromotionById = async (req, res) => {
    try {
        const promotion = await Promotions.findOne({ _id: req.params.id });
        if (promotion) {
            return res
                .status(200)
                .send({ message: "ดึงข้อมูลสำเร็จ", status: true, data: promotion });
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
        const promotion = await Promotions.findOne({ product_barcode: barcode });
        if (promotion) {
            return res.status(200).send({ status: true, data: promotion });
        } else {
            return res
                .status(400)
                .send({ status: false, message: "ไม่พบข้อมูลสินค้า" });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updatePromotion = async (req, res) => {
    try {
        const id = req.params.id;
        Promotions.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
                if (!data) {
                    res.status(404).send({
                        message: `ไม่สามารถเเก้ไขข้อมูลนี้ได้`,
                        status: false,
                    });
                } else
                    res.send({
                        message: "แก้ไขข้อมูลนี้เรียบร้อยเเล้ว",
                        status: true,
                    });
            })
            .catch((err) => {
                res.status(500).send({
                    message: "มีบ่างอย่างผิดพลาด",
                    status: false,
                });
            });
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.deletePromotion = async (req, res) => {
    try {
        const id = req.params.id;
        const promotion = await Promotions.findByIdAndDelete(id, { useFindAndModify: false, });
        if (!promotion) {
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
