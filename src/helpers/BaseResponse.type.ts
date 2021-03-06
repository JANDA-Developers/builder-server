import { ClassType, ObjectType, Field } from "type-graphql";
import { UserError } from "../api/Error/shared/Error.type";

export const GenerateFindOneResponse = <T>(
    tClass: ClassType<T>,
    name: string
) => {
    @ObjectType(`${name || tClass.name}Response`)
    class BaseResponseClass extends PlainResponse {
        constructor(ok?: boolean) {
            super(ok);
        }

        @Field(() => tClass, { nullable: true })
        data?: T;

        setData(data: T) {
            this.data = data;
        }
    }
    return BaseResponseClass;
};

export const GenerateResponse = <T>(tClass: ClassType<T>, name: string) => {
    @ObjectType(`${name || tClass.name}Response`)
    class BaseResponseClass extends PlainResponse {
        constructor(ok?: boolean) {
            super(ok);
        }

        @Field(() => tClass, { nullable: true })
        data?: T | null;

        setData(data: T | null) {
            this.data = data;
        }
    }
    return BaseResponseClass;
};

export const GenerateArrayReturnResponse = <T>(
    tClass: ClassType<T>,
    name: string
) => {
    @ObjectType(`${name || tClass.name}Response`)
    class BaseResponseClass extends PlainResponse {
        constructor(ok?: boolean) {
            super(ok);
        }

        @Field(() => [tClass])
        data?: T[];

        setData(data: T[]) {
            this.data = data;
        }
    }
    return BaseResponseClass;
};

export interface PlainResponse {
    setData(args: any): void;
}
@ObjectType("Response")
export class PlainResponse {
    constructor(ok?: boolean) {
        this.ok = ok === false ? false : true;
    }

    @Field(() => Boolean)
    ok: boolean;

    @Field(() => UserError, { nullable: true })
    error?: UserError;

    setError(error: UserError, ok?: boolean) {
        if (!(error instanceof UserError)) {
            throw error;
        }
        this.error = error;
        this.ok = ok != null ? ok : false;
    }
}
