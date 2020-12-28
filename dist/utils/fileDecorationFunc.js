"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genExprField = exports.genField = exports.toMongoExprQuery = exports.toMongoQuery = exports.divideFieldName = void 0;
const console_1 = require("console");
exports.divideFieldName = (field) => {
    // TODO: Filter Query Generator 생성
    if (field === "AND" || field === "OR") {
        return {
            field,
            operator: field,
        };
    }
    const idx = field.indexOf("_", 1);
    return { field: field.substr(0, idx), operator: field.substr(idx + 1) };
};
exports.toMongoQuery = (data) => {
    const temp = {};
    for (const key in data) {
        const value = data[key];
        const { field, operator } = exports.divideFieldName(key);
        if (field === "AND" || field === "OR") {
            // expr 타입으로 queryBuild하는아이 필요할듯
            temp["$expr"] = {
                [field === "OR" ? "$or" : "$and"]: exports.toMongoExprQuery(value),
            };
        }
        else {
            temp[field] = {
                ...temp[field],
                ...exports.genField(operator, value),
            };
        }
    }
    return temp;
};
exports.toMongoExprQuery = (data) => {
    const query = [];
    data.forEach((d) => {
        let temp;
        for (const key in d) {
            const value = d[key];
            const { field, operator } = exports.divideFieldName(key);
            if (field === "AND" || field === "OR") {
                // expr 타입으로 queryBuild하는아이 필요할듯
                temp = {
                    [field === "OR" ? "$or" : "$and"]: exports.toMongoExprQuery(value),
                };
                // console.log({ temp });
            }
            else {
                temp = exports.genExprField(field, operator, value);
            }
        }
        query.push(temp);
    });
    return query;
};
exports.genField = (gqlOperator, value) => {
    switch (gqlOperator) {
        case "eq":
            return { $eq: value };
        case "not_eq":
            return { $ne: value };
        case "contains":
            return { $regex: new RegExp(`(${value})`, "gi") };
        case "not_contains":
            return { $not: new RegExp(`(${value})`, "gi") };
        case "in":
            return { $in: value };
        case "not_in":
            return { $nin: value };
        case "include_all":
            return { $all: value instanceof Array ? value : [value] };
        case "not_include_all":
            return {
                $not: { $all: value instanceof Array ? value : [value] },
            };
        default:
            console_1.assert(gqlOperator, "Not supported operator");
            return {};
    }
};
exports.genExprField = (field, gqlOperator, value) => {
    const fieldReferer = `$${field}`;
    switch (gqlOperator) {
        case "eq":
            return { $eq: [value, fieldReferer] };
        case "not_eq":
            return { $ne: [value, fieldReferer] };
        case "contains":
            return {
                $regexMatch: {
                    input: fieldReferer,
                    regex: new RegExp(`(${value})`, "i"),
                },
            };
        case "not_contains":
            return {
                $not: {
                    $regexMatch: {
                        input: fieldReferer,
                        regex: new RegExp(`(${value})`, "i"),
                    },
                },
            };
        case "in":
            return {
                $size: {
                    $setIntersection: [
                        value instanceof Array ? value : [value],
                        fieldReferer,
                    ],
                },
            };
        case "not_in":
            return {
                $not: {
                    $size: {
                        $setIntersection: [
                            value instanceof Array ? value : [value],
                            fieldReferer,
                        ],
                    },
                },
            };
        case "all":
            return {
                $setIsSubset: [
                    value instanceof Array ? value : [value],
                    fieldReferer,
                ],
            };
        case "not_all":
            return {
                $not: {
                    $setIsSubset: [
                        value instanceof Array ? value : [value],
                        fieldReferer,
                    ],
                },
            };
        default:
            console_1.assert(gqlOperator, "Not supported operator");
            return {};
    }
};
//# sourceMappingURL=fileDecorationFunc.js.map