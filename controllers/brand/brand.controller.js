const { Brands, validate } = require("../../model/brand/brand.model");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            const brand = await new Brands({
                ...req.body,
            });
            brand.save();
            return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true, data: brand });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getBrandAll = async (req, res) => {
    try {
        const brand = await Brands.find();
        if (brand) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: brand });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getBrandById = async (req, res) => {
    try {
        const brand = await Brands.findOne({ _id: req.params.id });
        if (brand) {
            return res
                .status(200)
                .send({ message: "ดึงประเภทสินค้าสำเร็จ", status: true, data: brand });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงประเภทสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updateBrand = async (req, res) => {
    try {
        const brand = await Brands.findByIdAndUpdate(req.params.id, req.body);
        if (brand) {
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

exports.deleteBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const brand = await Brands.findByIdAndDelete(id);
        if (!brand) {
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
