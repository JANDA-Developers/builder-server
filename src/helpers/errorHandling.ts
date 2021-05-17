import { ApolloError } from "apollo-server-express";
import {
    validate,
    ValidationArguments,
    ValidationError,
} from "class-validator";
import { UserError } from "../api/Error/shared/Error.type";

export const validateClass = async (itemClass: any) => {
    const errors: ValidationError[] = [];
    errors.push(...(await validate(itemClass)));
    if (errors.length !== 0) {
        throw new UserError("Validation Error", "VALIDATION_ERROR", errors);
    }
};

export const validationFailMessageFormat = (
    validationArgs: ValidationArguments
) => `target = ${validationArgs.targetName}, input= ${validationArgs.value}`;

export const errorGenForUnexist = (
    target:
        | "User"
        | "Product"
        | "WebPage"
        | "ProductGroup"
        | "Item"
        | "Domain"
        | "Category"
) =>
    new ApolloError(
        `${target}Id is unexists`,
        `${target.toUpperCase()}_UNDEFINED`
    );
