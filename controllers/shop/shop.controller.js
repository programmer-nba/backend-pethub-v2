const { Shops, validate } = require("../../model/shop/shop.model");
const dayjs = require("dayjs");


exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            await new Shops({
                ...req.body,
            }).save();
            return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getShopAll = async (req, res) => {
    try {
        const shop = await Shops.find();
        if (!shop) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: shop });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getShopById = async (req, res) => {
    try {
        const id = req.params.id;
        const shop = await Shops.findById(id);
        if (!shop) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: shop });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updateShop = async (req, res) => {
    try {
        const id = req.params.id;
        if (!req.body) {
            return res
                .status(400)
                .send({ status: false, message: error.details[0].message });
        }
        const shop_new = await Shops.findByIdAndUpdate(id, req.body);
        if (!shop_new) {
            return res
                .status(400)
                .send({ status: false, message: "ไม่สามารถแก้ไขผู้ใช้งานนี้ได้" });
        } else {
            return res.send({
                status: true,
                message: "แก้ไขข้อมูลผู้ใช้งานเรียบร้อย",
            });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.deleteShop = async (req, res) => {
    try {
        const id = req.params.id;
        const shop = await Shops.findByIdAndDelete(id);
        if (!shop) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res.status(200).send({ status: true, message: "ลบข้อผู้ใช้สำเร็จ" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};
