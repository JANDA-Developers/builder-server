"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.dateToParts = void 0;
const _padStart = (d) => d.toString().padStart(2, "0");
exports.dateToParts = (date) => {
    return {
        y: date.getUTCFullYear(),
        m: date.getUTCMonth() + 1,
        d: date.getUTCDate(),
        h: date.getUTCHours(),
        i: date.getUTCMinutes(),
        s: date.getUTCSeconds(),
    };
};
exports.formatDate = (date, format = "%y%m%d%h%i%s") => {
    return format
        .replace(/%y/, date.getFullYear().toString())
        .replace(/%m/, _padStart(date.getUTCMonth() + 1))
        .replace(/%d/, _padStart(date.getUTCDate()))
        .replace(/%h/, _padStart(date.getUTCHours()))
        .replace(/%i/, _padStart(date.getUTCMinutes()))
        .replace(/%s/, _padStart(date.getUTCSeconds()));
};
//# sourceMappingURL=dateUtils.js.map