"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./Routes/Routes"));
const connection_1 = __importDefault(require("./db/connection"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config({ path: "./.env" });
const port = process.env.PORT || 2000; //5002
app.use(Routes_1.default);
(0, connection_1.default)();
// demo
app.get("/", (req, res) => {
    res.send("Express + TypeScript Server");
});
app.get("/hi", (req, res) => {
    res.send("hii expressss");
});
app.listen(port, () => {
    console.log(`[server]: hell my Server is running at http://localhost:${port}`);
});
