"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// import jwt from "jsonwebtoken";
const noteSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        require: true
    },
    text: {
        type: String,
        require: true
    },
    // passwd:{
    //     type:String,
    //     require:true
    // },
    // cPasswd:{
    //     type:String,
    //     require:true
    // },
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
const User = mongoose_1.default.model("notesData", noteSchema);
exports.default = User;
