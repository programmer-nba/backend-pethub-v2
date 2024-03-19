const { PreOrderStores, validate } = require("../../model/pos/preorder.store.model")

exports.create = async (req, res) => {
    console.log("สร้าง");
    try {
        const { error } = validate(req.body);
        // console.log("error");
        if (error) {
            return res
                .status(400)
                .send({ message: error.details[0].message, status: false });
        } else {
            const result = await new PreOrderStores({
                ...req.body,
            }).save();
            return res.status(201).send({
                message: "เพิ่มข้อมูลสำเร็จ",
                status: true,
                ponba: result,
            });
        }
    } catch (error) {
        res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.findAll = async (req, res) => {
    try {
        PreOrderStores.find()
            .then(async (data) => {
                res.send({ data, message: "success", status: true });
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || "มีบางอย่างผิดพลาด",
                });
            });
    } catch (error) {
        res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
    try {
        const preorder = await PreOrderStores.findOne({ _id: id });
        if (!preorder)
            return res.status(404).send({ message: "ไม่สามารถหารายการนี้ได้", status: false });
        return res.status(200).send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: preorder })
    } catch (error) {
        res.status(500).send({
            message: "มีบางอย่างผิดพลาด",
            status: false,
        });
    }
};


exports.findByShopId = async (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
        PreOrderStores.find({ ponba_shop_id: id })
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

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        PreOrderStores.findByIdAndRemove(id, { useFindAndModify: false })
            .then((data) => {
                console.log(data);
                if (!data) {
                    res.status(404).send({
                        message: `ไม่สามารถลบรายการนี้ได้`,
                        status: false,
                    });
                } else {
                    res.send({
                        message: "ลบรายการนี้เรียบร้อยเเล้ว",
                        status: true,
                    });
                }
            })
            .catch((err) => {
                res.status(500).send({
                    message: "ไม่สามารถลบรายการนี้ได้",
                    status: false,
                });
            });
    } catch (error) {
        res.status(500).send({
            message: "ไม่สามารถลบรายงานนี้ได้",
            status: false,
        });
    }
};

exports.update = async (req, res) => {
    console.log(req.body);
    try {
        if (!req.body) {
            return res.status(400).send({
                message: "ส่งข้อมูลผิดพลาด",
            });
        }
        const id = req.params.id;

        PreOrderStores.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then((data) => {
                console.log(data);
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
    } catch (error) {
        res.status(500).send({ message: "มีบางอย่างผิดพลาด", status: false });
    }
};
