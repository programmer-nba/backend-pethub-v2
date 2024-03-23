const { Members } = require("../../model/user/member.model");
const dayjs = require("dayjs");

exports.create = async (req, res) => {
    try {
        // const { error } = validate(req.body);
        // if (error) {
        //     return res
        //         .status(400)
        //         .send({ status: false, message: error.details[0].message });
        // }
        const user = await Members.findOne({
            tel: req.body.tel,
        });
        if (user)
            return res.status(400).send({
                status: false,
                message: "มีชื่อผู้ใช้งานนี้ในระบบเเล้ว",
            });
        const member = await Members.create(req.body);
        member.save();
        return res.status(200).send({ message: "สร้างข้อมูลสำเร็จ", status: true });
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getMemberAll = async (req, res) => {
    try {
        const member = await Members.find();
        if (!member) {
            return res
                .status(404)
                .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: member });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getMemberById = async (req, res) => {
    try {
        const id = req.params.id;
        const member = await Members.findById(id);
        if (!member) {
            return res
                .status(404)
                .send({ status: false, message: "ดึงข้อมูลไม่สำเร็จ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: member });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.getMemberByTel = async (req, res) => {
    try {
        const tel = req.params.id;
        const member = await Members.findOne({ tel: tel });
        if (!member) {
            return res
                .status(404)
                .send({ status: false, message: "ไม่พบผู้ใช้งานในระบบ" });
        } else {
            return res
                .status(200)
                .send({ status: true, message: "ดึงข้อมูลสำเร็จ", data: member });
        }
    } catch (err) {
        return res.status(500).send({ status: false, message: "มีบางอย่างผิดพลาด" });
    }
};

exports.updateMember = async (req, res) => {
    try {
        const id = req.params.id;
        const new_member = await Members.findByIdAndUpdate(id, req.body);
        if (!new_member) {
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

exports.deleteMember = async (req, res) => {
    try {
        const id = req.params.id;
        const member = await Members.findByIdAndDelete(id);
        if (!member) {
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
