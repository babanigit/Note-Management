"use strict";
// const express = require("express");
// const dotenv = require("dotenv");
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import router from "./Routes/Routes"
const app = (0, express_1.default)();
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./Routes/Routes"));
dotenv_1.default.config();
app.use(express_1.default.json());
const port = process.env.PORT || 2000; //5002
// app.use(router,require("./Routes/Routes"))
app.use(Routes_1.default);
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/hi", (req, res) => {
    res.send("hii expressss");
});
app.listen(port, () => {
    console.log(`[server]: hell my Server is running at http://localhost:${port}`);
});
