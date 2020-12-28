"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbUri = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: __dirname + "/../../.env",
});
const testConn_1 = require("./testConn");
exports.dbUri = testConn_1.getDBUri();
// console.log(`setup.ts => ${dbUri}`);
// testConn(dbUri).then(() => process.exit());
//# sourceMappingURL=setup.js.map