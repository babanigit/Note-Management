"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import express,{Express,Request,Response} from "express"
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const connection_1 = __importDefault(require("./db/connection"));
const noteRoutes_1 = __importDefault(require("./Routes/noteRoutes"));
dotenv_1.default.config({ path: "./.env" });
const port = process.env.PORT;
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// import utilEnv from "./util/validateEnv";
(0, connection_1.default)();
// routes
app.use("/api/notes", noteRoutes_1.default);
app.get("/", (req, res, next) => {
    try {
        res.status(200).json({
            message: "Express.js + Typescript server is live ",
        });
    }
    catch (error) {
        next(error);
    }
});
// end point middleware
app.use((res, req, next) => {
    next(Error("endpoint not found"));
});
// error handler middleware
app.use((error, req, res, next) => {
    console.error(error);
    let errorMessage = "an unknown error occurred";
    if (error instanceof Error)
        errorMessage = error.message;
    res.status(500).json({ error: errorMessage });
});
app.listen(port, () => {
    console.log(`[server]: hello, my Server is running at http://localhost:${port}`);
});
