"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RECURSIVE_RETURN_TYPE_OPERATORS = exports.STRING_RETURN_TYPE_OPERATORS = exports.ARRAY_RETURN_TYPE_OPERATORS = exports.getMetadataStorage = void 0;
const metadataStorage = {
    filters: [],
    sorting: [],
};
function getMetadataStorage() {
    return metadataStorage;
}
exports.getMetadataStorage = getMetadataStorage;
exports.ARRAY_RETURN_TYPE_OPERATORS = [
    "in",
    "not_in",
    "all",
    "not_all",
];
exports.STRING_RETURN_TYPE_OPERATORS = [
    "contains",
    "not_contains",
    "in",
    "not_in",
];
exports.RECURSIVE_RETURN_TYPE_OPERATORS = ["AND", "OR"];
//# sourceMappingURL=types.js.map