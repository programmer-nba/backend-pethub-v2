const { PreorderShops, validate } = require("../../model/pos/preorder.shop.model");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(403).send({ status: false, message: error.details[0].message })
        const result = new PreorderShops({ ...req.body });
        result.save();
        return res.status(200).send({ status: true, message: "บันทึกการขายสำเร็จ", data: result });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.pause = async (req, res) => {
    try {
        const { error } = validate(req.body)
        if (error)
            return res.status(403).send({ status: false, message: error.details[0].message })
        const result = new PreorderShops({ ...req.body });
        result.save();
        return res.status(200).send({ status: true, message: "บันทึกการขายสำเร็จ", data: result });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getPreorderAll = async (req, res) => {
    try {
        const result = await PreorderShops.find();
        if (!result)
            return res.status(403).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" })
        return res.status(200).send({ status: true, message: "บันทึกการขายสำเร็จ", data: result });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getPreorderById = async (req, res) => {
    try {
        const result = await PreorderShops.findOne({ _id: req.params.id });
        if (!result)
            return res.status(403).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" })
        return res.status(200).send({ status: true, message: "บันทึกการขายสำเร็จ", data: result });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getPreorderByShopId = async (req, res) => {
    try {
        const data = await PreorderShops.find();
        const result = data.filter(
            (el) => el.poshop_shop_id === req.params.id
        );
        if (!result)
            return res.status(403).send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" })
        return res.status(200).send({ status: true, message: "บันทึกการขายสำเร็จ", data: result });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};