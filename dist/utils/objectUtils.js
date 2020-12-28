"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToArr = void 0;
exports.mapToArr = (tagMap) => {
    const result = [];
    for (const [key, value] of tagMap) {
        result.push({
            key,
            value,
        });
    }
    return result;
};
//# sourceMappingURL=objectUtils.js.map