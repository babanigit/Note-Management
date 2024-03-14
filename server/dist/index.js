"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Routes_1 = __importDefault(require("./Routes/Routes"));
const connection_1 = __importDefault(require("./db/connection"));
// import utilEnv from "./util/validateEnv";
const cors = require("cors");
const app = (0, express_1.default)();
app.use(express_1.default.json());
dotenv_1.default.config({ path: "./.env" });
const port = process.env.PORT; //5002
app.use(cors());
(0, connection_1.default)();
// routes
app.use(Routes_1.default);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Express.js + Typescript server is live "
    });
});
app.listen(port, () => {
    console.log(`[server]: hello, my Server is running at http://localhost:${port}`);
});
