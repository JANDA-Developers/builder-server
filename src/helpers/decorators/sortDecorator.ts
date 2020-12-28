import { getMetadataStorage } from "../../helpers/decorators/FilterInputGen/types";

export function Sorting(): PropertyDecorator {
    return (prototype, field: string | symbol) => {
        const metadataStorage = getMetadataStorage();
        metadataStorage.sorting.push({
            field,
            target: prototype.constructor,
        });
    };
}
