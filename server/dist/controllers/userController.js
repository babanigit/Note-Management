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
exports.getData2 = exports.getData = exports.getLogin = exports.getRegister = void 0;
const userSchema_1 = __importDefault(require("../models/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("http-errors"));
const getRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, email, passwd, cPasswd } = yield req.body;
        if (!userName || !email || !passwd || !cPasswd) {
            res.status(200).json({ message: "parameters missing" });
            throw (0, http_errors_1.default)(400, "parameters missing");
            res.status(422).json({
                error: "pls fill the registration form",
                process: 0,
            });
        }
        else {
            // const userExist= await User.findOne({email:email});
            const existingUserEmail = yield userSchema_1.default.findOne({ email: email });
            if (existingUserEmail) {
                res.status(200).json({ message: "email is already taken" });
                throw (0, http_errors_1.default)(409, "email is already taken!");
                res.status(400).json({
                    message: `user ${email} is already registered`,
                    process: 1,
                });
            }
            const existingUserUserName = yield userSchema_1.default.findOne({ userName: userName });
            if (existingUserUserName) {
                res.status(200).json({ message: "username is already taken" });
                throw (0, http_errors_1.default)(409, "username is already taken!");
            }
            else {
                if (passwd !== cPasswd) {
                    res.status(200).json({ message: "confirm password is not matching" });
                    throw (0, http_errors_1.default)(400, "confirm password is not matching");
                }
                // password hashing
                const hashedPasswd = yield bcrypt_1.default.hash(passwd, 10);
                const newUser = yield userSchema_1.default.create({
                    userName,
                    email,
                    passwd: hashedPasswd,
                    cPasswd: hashedPasswd,
                });
                res.status(200).json(newUser);
                // console.log(`user Created ${email}`);
                // res
                // // generate token
                // const accessToken = jwt.sign(
                //   {
                //     user: {
                //       userName: newUser.username,
                //       email: newUser.email,
                //       userId: newUser._id.toString(),
                //     },
                //   },
                //   process.env.ACCESS_TOKEN_SECRET!,
                //   { expiresIn: "20d" }
                // );
                // if (newUser) {
                //   res.status(200).json({
                //     message: `registration successful ${userName}`,
                //     user: newUser,
                //     token: accessToken,
                //     process: 1,
                //   });
                // } else {
                //   res.status(400).json({
                //     message: "user data invalid",
                //     process: 0,
                //   });
                // }
                // console.log("register successful");
            }
        }
    }
    catch (error) {
        console.log("error in /register");
        console.error(error);
    }
});
exports.getRegister = getRegister;
const getLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, passwd } = yield req.body;
        if (!email || !passwd) {
            res.status(400).json({
                message: "all field required",
                process: 0,
            });
        }
        else {
            const user = yield userSchema_1.default.findOne({ email });
            if (user && (yield bcrypt_1.default.compare(passwd, user.passwd))) {
                // token
                const accessToken = jsonwebtoken_1.default.sign({
                    user: {
                        userName: user.userName,
                        email: user.email,
                        userId: user._id.toString(),
                    },
                }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "20d" });
                // // cookie
                // res.cookie("jwtTokenBablu", accessToken, {
                //   expires: new Date(Date.now() + 2589000000),
                //   httpOnly: true,
                // });
                res.status(200).json({
                    user: user,
                    message: "Login successful from server",
                    token: accessToken,
                    process: 1,
                });
            }
            else {
                res.status(404).json({
                    message: " invalid credentials ",
                    process: 0,
                });
            }
        }
    }
    catch (error) {
        console.log("error in /login");
        console.error(error);
    }
});
exports.getLogin = getLogin;
const getData = (req, res) => {
    res.status(200).json({ message: "get all contacts " });
};
exports.getData = getData;
const getData2 = (req, res) => {
    const { userName, phone } = req.body;
    res.status(200).json({ message: `get all contacts ${userName} and ${phone} ` });
};
exports.getData2 = getData2;
