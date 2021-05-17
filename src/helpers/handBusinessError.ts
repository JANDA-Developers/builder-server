import { ClassType } from "type-graphql";
import { PlainResponse } from "./BaseResponse.type";
import chalk from "chalk";

export const handleBusinessError = async <
    A = any,
    T extends PlainResponse = PlainResponse
>(
    ResCls: ClassType<T>,
    main: (response: T) => Promise<A>
): Promise<T> => {
    const response = new ResCls();
    try {
        const data = await main(response);
        response.setData(data);
    } catch (error) {
        console.log(chalk.red(error));
        if (error instanceof Array) {
            error.forEach((err) => {
                filterErrorForClient(err, response);
            });
        } else {
            filterErrorForClient(error, response);
        }
        response.ok = false;
    }
    return response;
};

const filterErrorForClient = (error: any, response: any): void => {
    response.setError(error);
};
