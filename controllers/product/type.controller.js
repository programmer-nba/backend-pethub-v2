const { Types, validate } = require("../../model/product/type.model");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            const type = await new Types({
                ...req.body,
            });
            type.save();
            return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true, data: type });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getTypeAll = async (req, res) => {
    try {
        const type = await Types.find();
        if (type) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: type });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getTypeById = async (req, res) => {
    try {
        const type = await Types.findOne({ _id: req.params.id });
        if (type) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: type });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updateType = async (req, res) => {
    try {
        const type = await Types.findByIdAndUpdate(req.params.id, req.body);
        if (type) {
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


exports.deleteType = async (req, res) => {
    try {
        const id = req.params.id;
        const type = await Types.findByIdAndDelete(id);
        if (!type) {
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
