"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sorting = void 0;
const types_1 = require("../../helpers/decorators/FilterInputGen/types");
function Sorting() {
    return (prototype, field) => {
        const metadataStorage = types_1.getMetadataStorage();
        metadataStorage.sorting.push({
            field,
            target: prototype.constructor,
        });
    };
}
exports.Sorting = Sorting;
//# sourceMappingURL=sortDecorator.js.map