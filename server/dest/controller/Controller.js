"use strict";
// all the functionality will come here
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userSchema_1 = __importDefault(require("../model/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, passwd, cPasswd } = yield req.body;
        if (!name || !email || !phone || !passwd || !cPasswd) {
            res.status(422).json({ error: "pls fill the registeration form" });
        }
        else {
            // const userExist= await User.findOne({email:email});
            if (yield userSchema_1.default.findOne({ email: email })) {
                res
                    .status(400)
                    .json({ message: `user ${email} is already registered` });
            }
            else {
                const hashedPasswd = yield bcrypt_1.default.hash(passwd, 10);
                const user = yield userSchema_1.default.create({
                    name,
                    email,
                    phone,
                    passwd: hashedPasswd,
                    cPasswd: hashedPasswd,
                });
                console.log("register successful");
                res
                    .status(200)
                    .json({
                    message: `successful, User created `,
                    user: user,
                });
            }
        }
    }
    catch (error) {
        console.log("error in /register");
        console.error(error);
    }
});
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, passwd } = yield req.body;
        if (!email || !passwd) {
            res.status(422).json({ error: "pls fill the Login" });
        }
        else {
            const user = yield userSchema_1.default.findOne({ email });
            console.log(user === null || user === void 0 ? void 0 : user._id);
            if (user && (yield bcrypt_1.default.compare(passwd, user.passwd))) {
                // token
                const accessToken = jsonwebtoken_1.default.sign({
                    user: {
                        name: user.name,
                        email: user.email,
                        userId: user._id.toString(),
                    },
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20d" });
                // cookie
                res.cookie("jwtTokenBablu", accessToken, {
                    expires: new Date(Date.now() + 2589000000),
                    httpOnly: true,
                });
                console.log("login successfull");
                res.status(200).json({
                    msg: user,
                    token: accessToken,
                    userId: user._id.toString(),
                });
            }
            else {
                res.status(401).json({ message: " invalid credentials " });
            }
        }
    }
    catch (error) {
        console.log("error in /login");
        console.error(error);
    }
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
