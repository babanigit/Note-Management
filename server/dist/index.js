"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const connection_1 = __importDefault(require("./db/connection"));
// import utilEnv from "./util/validateEnv";
const port = process.env.PORT; //5002
(0, connection_1.default)();
app_1.default.listen(port, () => {
    console.log(`[server]: hello, my Server is running at http://localhost:${port}`);
});
