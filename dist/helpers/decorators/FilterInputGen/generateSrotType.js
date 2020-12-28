"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSortType = void 0;
/* eslint-disable @typescript-eslint/ban-types */
const type_graphql_1 = require("type-graphql");
const getMetadataStorage_1 = require("type-graphql/dist/metadata/getMetadataStorage");
const types_1 = require("../../../helpers/decorators/FilterInputGen/types");
/**
 * Generate a type-graphql InputType from a @ObjectType decorated
 * class by calling the @InputType and @Field decorators
 *
 * This should be used to generate the type of the @Arg
 * decorator on the corresponding resolver.
 *
 * @param type
 */
exports.generateSortType = (type) => {
    const filtersData = getSortingsData(type);
    const typeGraphQLMetadata = getMetadataStorage_1.getMetadataStorage();
    const graphQLModel = getTypeGraphqlModel(type, typeGraphQLMetadata);
    const sortContainer = {};
    // Simulate creation of fields for this class/InputType by calling @Field()
    for (const { field } of filtersData) {
        // When dealing with methods decorated with @Field, we need to lookup the GraphQL
        // name and use that for our filter name instead of the plain method name
        const graphQLField = typeGraphQLMetadata.fieldResolvers.find((fr) => fr.target === type && fr.methodName === field);
        const fieldName = graphQLField
            ? graphQLField.schemaName
            : field.toString();
        sortContainer[`${fieldName}_desc`] = `${fieldName}_desc`;
        sortContainer[`${fieldName}_asc`] = `${fieldName}_asc`;
    }
    type_graphql_1.registerEnumType(sortContainer, {
        name: `_${graphQLModel.name}Sort`,
        description: "Auto generated sort type",
    });
    return () => [sortContainer];
};
const getSortingsData = (type) => {
    const metadataStorage = types_1.getMetadataStorage();
    const sortData = metadataStorage.sorting.filter((f) => f.target === type);
    return sortData;
};
const getTypeGraphqlModel = (type, typeGraphQLMetadata) => {
    const objectTypesList = typeGraphQLMetadata.objectTypes;
    const graphQLModel = objectTypesList.find((ot) => ot.target === type);
    if (!graphQLModel) {
        throw new Error(`Please decorate your class "${type}" with @ObjectType if you want to filter it`);
    }
    return graphQLModel;
};
//# sourceMappingURL=generateSrotType.js.map