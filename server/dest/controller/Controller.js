"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const getRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
const getData = (req, res) => {
    res.status(200).json({ message: "get all contacts " });
};
const getData2 = (req, res) => {
    const { name, phone } = req.body;
    res.status(200).json({ message: `get all contacts ${name} and ${phone} ` });
};
const registeruser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        console.error(error);
    }
});
module.exports = {
    getRegister,
    getLogin,
    getData,
    getData2,
};
