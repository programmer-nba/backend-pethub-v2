const { Stocks, validate } = require("../../model/shop/stock.model");

exports.create = async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) {
            return res.status(400).send({ status: false, message: error.details[0].message });
        } else {
            const stock = await new Stocks({
                ...req.body,
            });
            stock.save();
            return res.status(201).send({ message: "สร้างรายงานใหม่เเล้ว", status: true, data: stock });
        }
    } catch (err) {
        return res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.getStockAll = async (req, res) => {
    try {
        const stock = await Stocks.find();
        if (stock) {
            return res
                .status(200)
                .send({ message: "ดึงข้อมูลคลังสินค้าสำเร็จ", status: true, data: stock });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงข้อมูลคลังสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getStockById = async (req, res) => {
    try {
        const stock = await Stocks.findOne({ _id: req.params.id });
        if (stock) {
            return res
                .status(200)
                .send({ message: "ดึงข้อมูลคลังสินค้าสำเร็จ", status: true, data: stock });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงข้อมูลคลังสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getStockByShopId = async (req, res) => {
    try {
        // const stock = await Stocks.findOne({ _id: req.params.id });
        const stock = await Stocks.find();
        const stocks = stock.filter(
            (el) => el.shop_id === req.params.id,
        );
        if (stocks) {
            return res
                .status(200)
                .send({ message: "ดึงข้อมูลคลังสินค้าสำเร็จ", status: true, data: stocks });
        } else {
            return res
                .status(500)
                .send({ message: "ดึงข้อมูลคลังสินค้าไม่สำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};


exports.updateStock = async (req, res) => {
    try {
        const stock = await Stocks.findByIdAndUpdate(req.params.id, req.body);
        if (stock) {
            return res
                .status(200)
                .send({ message: "แก้ไขข้อมูลคลังสินค้าไม่สำเร็จ", status: true });
        } else {
            return res
                .status(500)
                .send({ message: "แก้ไขข้อมูลคลังสินค้าสำเร็จ", status: false });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};


exports.deleteStock = async (req, res) => {
    try {
        const id = req.params.id;
        const stock = await Stocks.findByIdAndDelete(id);
        if (!stock) {
            return res.status(404).send({ status: false, message: "ไม่พบคลังสินค้า" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ลบข้อมูลคลังสำเร็จ" });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};
