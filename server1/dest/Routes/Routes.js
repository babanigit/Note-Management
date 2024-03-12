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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userSchema_1 = __importDefault(require("../model/userSchema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = express_1.default.Router();
const { getData, getData2, getRegister, getLogin } = require("../controller/Controller");
// Registration
router.route("/register").post(getRegister);
// login
router.route("/login").post(getLogin);
// for login2 (this is for demo)
router.post("/login2", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, passwd } = yield req.body;
        console.log(email, passwd);
        if (!email || !passwd) {
            res.status(422).json({ error: "pls fill the Login from login2" });
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
                // // cookie
                // res.cookie("jwtTokenBablu", accessToken, {
                //   expires: new Date(Date.now() + 2589000000),
                //   httpOnly: true,
                // });
                console.log("login successful");
                res.status(200).json({
                    message: "Login successful from server",
                    user: user,
                    token: accessToken,
                });
            }
            else {
                res.json({ message: " invalid credentials " });
            }
        }
    }
    catch (error) {
        console.log("error in /login2");
        console.error(error);
    }
}));
// demo routes
router.route("/trail").get(getData);
router.route("/getdata").post(getData2);
router.route("/demo").post((req, res) => __awaiter(void 0, void 0, void 0, function* () { }));
//   module.exports ={
//     router
//   }
exports.default = router;
