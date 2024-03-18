const { Shops, validate } = require("../../model/shop/shop.model");
const { Stocks } = require("../../model/shop/stock.model");
const dayjs = require("dayjs");


exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            const shop_name = await Shops.findOne({
                shop_name: req.body.shop_name,
            });
            const shop_number = await Shops.findOne({
                shop_number: req.body.shop_number,
            });
            if (shop_name || shop_number) {
                return res.status(403).send({ status: false, message: "มีสาขาหรือรหัสสาขานี้ในระบบแล้ว" });
            } else {
                const new_data = await new Shops({ ...req.body });
                const data_store_front = {
                    shop_id: new_data._id,
                    shop_type: 'คลังหน้าชั้น',
                };
                const data_store_back = {
                    shop_id: new_data._id,
                    shop_type: 'คลังสต๊อก',
                };
                const data_store_online = {
                    shop_id: new_data._id,
                    shop_type: 'คลังออนไลน์',
                };
                const data_store_shipping = {
                    shop_id: new_data._id,
                    shop_type: 'คลังส่งของ',
                };
                await new Stocks(data_store_front).save();
                await new Stocks(data_store_back).save();
                await new Stocks(data_store_online).save();
                await new Stocks(data_store_shipping).save();
                new_data.save();
                return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true, data: new_data });
            }
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
