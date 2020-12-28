"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIpAddress = void 0;
exports.getIpAddress = (req) => {
    const ffHeaderValue = req.headers["x-forwarded-for"];
    if (typeof ffHeaderValue === "string") {
        return ffHeaderValue;
    }
    return ((ffHeaderValue && ffHeaderValue[0]) ||
        req.connection.remoteAddress ||
        "");
};
//# sourceMappingURL=httpFunctions.js.map