const { Categorys, validate } = require("../../model/product/category.model");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            const category = await new Categorys({
                ...req.body,
            });
            category.save();
            return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true, data: category });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getCategoryAll = async (req, res) => {
    try {
        const category = await Categorys.find();
        if (category) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: category });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await Categorys.findOne({ _id: req.params.id });
        if (category) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: category });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const category = await Categorys.findByIdAndUpdate(req.params.id, req.body);
        if (category) {
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

exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await Categorys.findByIdAndDelete(id);
        if (!category) {
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
