"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRandomStringCode = void 0;
const genCode = (d) => Math.random().toString(36).substr(2, d).toUpperCase();
const numTo36str = (n) => n.toString(36).toUpperCase();
const charSum = (v) => [...v].map((v) => v.charCodeAt(0)).reduce((a, b) => a + b);
exports.generateRandomStringCode = (digits = 6, ableToValidate = false) => {
    if (ableToValidate) {
        const tempCode = genCode(digits - 2);
        const charCodeSum = numTo36str(charSum(tempCode));
        return charCodeSum + tempCode;
    }
    return genCode(digits);
};
//# sourceMappingURL=generateRandomCode.js.map