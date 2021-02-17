"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDomain = void 0;
exports.isDomain = (string) => {
    const validater = new RegExp("^((?!-)[A-Za-z0-9-]" + "{1,63}(?<!-)\\.)" + "+[A-Za-z]{2,6}");
    return validater.test(string);
};
//# sourceMappingURL=isDomain.js.map