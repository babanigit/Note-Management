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
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./Routes/userRoutes"));
const noteSchema_1 = __importDefault(require("./model/noteSchema"));
dotenv_1.default.config({ path: "./.env" });
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// routes
app.use(userRoutes_1.default);
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // res.status(200).json({
    //   message:"Express.js + Typescript server is live "
    // })
    try {
        // throw Error("Bazinga!");
        const notes = yield noteSchema_1.default.find().exec();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
}));
app.use((res, req, next) => {
    next(Error("endpoint not found"));
});
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "an unknown error occurred";
    if (error instanceof Error)
        errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});
exports.default = app;
