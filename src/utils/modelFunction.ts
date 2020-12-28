
import { ModelType } from "@typegoose/typegoose/lib/types";

export const getMongoInstance = <T>(modelType: ModelType<T>, obj: T) => {
    return new modelType(obj);
};
