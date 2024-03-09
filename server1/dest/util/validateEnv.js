"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
const envalid_2 = require("envalid");
exports.default = (0, envalid_1.cleanEnv)(process.env, {
    PORT: (0, envalid_2.port)(),
    DATABASE: (0, envalid_2.str)(),
    ACCESS_TOKEN_SECRET: (0, envalid_2.str)(),
});
