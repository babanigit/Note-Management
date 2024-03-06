"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getData = (req, res) => {
    res.status(200).json({ message: "get all contacts " });
};
const getData2 = (req, res) => {
    const { name, phone } = req.body;
    res.status(200).json({ message: `get all contacts ${name} and ${phone} ` });
};
module.exports = {
    getData,
    getData2
};
