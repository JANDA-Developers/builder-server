"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayFilter = exports.ValueFilter = void 0;
const types_1 = require("../../../helpers/decorators/FilterInputGen/types");
/**
 * This decorator will store filters information for the field in a metadata storage.
 * We will use this metadata later on to generate an InputType for the filters argument
 *
 * @param operators
 * @param returnTypeFunction
 */
function ValueFilter(operators, returnTypeFunction) {
    return (prototype, field) => {
        const metadataStorage = types_1.getMetadataStorage();
        metadataStorage.filters.push({
            field,
            getReturnType: returnTypeFunction,
            operators: typeof operators === "string" ? [operators] : operators,
            target: prototype.constructor,
        });
    };
}
exports.ValueFilter = ValueFilter;
function ArrayFilter(operators, returnTypeFunction) {
    return (prototype, field) => {
        const metadataStorage = types_1.getMetadataStorage();
        metadataStorage.filters.push({
            field,
            getReturnType: returnTypeFunction,
            operators: typeof operators === "string" ? [operators] : operators,
            target: prototype.constructor,
        });
    };
}
exports.ArrayFilter = ArrayFilter;
//# sourceMappingURL=FilterDecorators.js.map