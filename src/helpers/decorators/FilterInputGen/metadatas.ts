import { FiltersCollectionType } from "../../../helpers/decorators/FilterInputGen/types";

export type MetadataStorage = {
    filters: FiltersCollectionType[];
};

const metadataStorage = {
    filters: [],
};

export function getMetadataStorage(): MetadataStorage {
    return metadataStorage;
}
