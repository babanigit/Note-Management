"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const jwt = require("jsonwebtoken");
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    passwd: {
        type: String,
        require: true
    },
    cPasswd: {
        type: String,
        require: true
    },
}, {
    timestamps: true,
});
// // generate token   '
// userSchema.methods.generateToken=async function () {
//     const accessToken = jwt.sign(
//           {
//             user: {
//               name: user.name,
//               email: user.email,
//               userId: user._id.toString(),
//             },
//           },
//           process.env.ACCESS_TOKEN_SECRET!,
//           { expiresIn: "20d" }
//         );
//     return
// }
const User = mongoose_1.default.model("notesData", userSchema);
exports.default = User;
