"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggerCloudWatch = void 0;
require("reflect-metadata");
const winston_1 = require("winston");
const winston_cloudwatch_1 = __importDefault(require("winston-cloudwatch"));
exports.loggerCloudWatch = winston_1.createLogger({
    transports: [
        new winston_cloudwatch_1.default({
            logGroupName: process.env.LOG_GROUP_NAME || "ETC",
            logStreamName: () => {
                const DateNtime = new Date().toISOString().split("T");
                return `[${process.env.LOG_STREAM_NAME || "Nothing"}] ${DateNtime[0]} ${DateNtime[1].substr(0, 2)}h00m`;
            },
        }),
    ],
});
//# sourceMappingURL=logger.js.map