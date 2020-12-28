"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeGraphqlModel = exports.generateFilterType = void 0;
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
exports.generateFilterType = (type) => {
    const filtersData = getFiltersData(type);
    const typeGraphQLMetadata = getMetadataStorage_1.getMetadataStorage();
    const graphQLModel = exports.getTypeGraphqlModel(type, typeGraphQLMetadata);
    // Create a new empty class with the "<graphQLModel.name>Condition" name
    const filterName = `_${graphQLModel.name}Filter`;
    const filterContainer = {
        [filterName]: class {
        },
    };
    // Call the @InputType decorator on that class
    type_graphql_1.InputType()(filterContainer[filterName]);
    type_graphql_1.Field(() => [filterContainer[filterName]], {
        nullable: true,
    })(filterContainer[filterName].prototype, "AND");
    type_graphql_1.Field(() => [filterContainer[filterName]], {
        nullable: true,
    })(filterContainer[filterName].prototype, "OR");
    // Simulate creation of fields for this class/InputType by calling @Field()
    for (const { field, operators, getReturnType } of filtersData) {
        // When dealing with methods decorated with @Field, we need to lookup the GraphQL
        // name and use that for our filter name instead of the plain method name
        const graphQLField = typeGraphQLMetadata.fieldResolvers.find((fr) => fr.target === type && fr.methodName === field);
        const fieldName = graphQLField ? graphQLField.schemaName : field;
        const baseReturnType = typeof getReturnType === "function" ? getReturnType() : String;
        type_graphql_1.Field(() => baseReturnType, { nullable: true })(filterContainer[filterName].prototype, `${String(fieldName)}_eq`);
        type_graphql_1.Field(() => baseReturnType, { nullable: true })(filterContainer[filterName].prototype, `${String(fieldName)}_not_eq`);
        for (const operator of operators) {
            // @Field에 들어가는 리턴타입임.
            const returnTypeFunction = ["in", "not_in"].includes(operator) &&
                !(baseReturnType instanceof Array)
                ? () => [baseReturnType]
                : () => baseReturnType;
            type_graphql_1.Field(returnTypeFunction, { nullable: true })(filterContainer[filterName].prototype, `${String(fieldName)}_${operator}`);
        }
    }
    const result = () => filterContainer[filterName];
    return result;
};
const getFiltersData = (type) => {
    const metadataStorage = types_1.getMetadataStorage();
    const filtersData = metadataStorage.filters.filter((f) => f.target === type);
    return filtersData;
};
exports.getTypeGraphqlModel = (type, typeGraphQLMetadata) => {
    const objectTypesList = [
        ...typeGraphQLMetadata.objectTypes,
        ...typeGraphQLMetadata.interfaceTypes,
    ];
    const graphQLModel = objectTypesList.find((ot) => ot.target === type);
    if (!graphQLModel) {
        throw new Error(`Please decorate your class "${type}" with @ObjectType if you want to filter it`);
    }
    return graphQLModel;
};
//# sourceMappingURL=generateFilterType.js.map