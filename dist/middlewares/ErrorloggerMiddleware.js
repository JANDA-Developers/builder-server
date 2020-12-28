"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessLogging = exports.getIpAddress = void 0;
const logger_1 = require("../logger");
const apollo_server_express_1 = require("apollo-server-express");
exports.getIpAddress = (req) => {
    const ffHeaderValue = req.headers["x-forwarded-for"];
    if (typeof ffHeaderValue === "string") {
        return ffHeaderValue;
    }
    return ((ffHeaderValue && ffHeaderValue[0]) ||
        req.connection.remoteAddress ||
        "");
};
class AccessLogging {
    constructor(logger) {
        this.logger = logger;
        this.logger = logger_1.loggerCloudWatch;
    }
    async use({ context, info, args, root }, next) {
        // 에러 로깅은 오직 Query, Mutation 실행 함수단에서만 실행한다.
        const parentTypeName = info.parentType.name;
        const beLogging = parentTypeName === "Query" || parentTypeName === "Mutation";
        if (!beLogging) {
            return next();
        }
        const now = Date.now();
        let isErrorBusinessLevel = false;
        let isErrorQueryLevel = false;
        let result;
        const queryLevelErrors = [];
        try {
            result = await next();
            if (beLogging) {
                isErrorBusinessLevel =
                    !result.ok && parentTypeName === "Mutation";
            }
        }
        catch (error) {
            isErrorQueryLevel = true;
            queryLevelErrors.push(error);
            throw apollo_server_express_1.toApolloError(error, "UNKNOWN_ERROR");
        }
        finally {
            const data = JSON.stringify(this.formatErrorLog({ info, context, args, root }, result, queryLevelErrors, now));
            if (isErrorBusinessLevel) {
                this.logger.warn(data);
            }
            if (isErrorQueryLevel) {
                this.logger.error(data);
            }
            if (!(isErrorQueryLevel || isErrorBusinessLevel)) {
                this.logger.info(data);
            }
        }
    }
    formatErrorLog({ info, context }, resultData, errors, time) {
        const user = context.user;
        const log = {
            resTime: Date.now() - time,
            request: {
                headers: context.req.headers,
                user: {
                    name: (user === null || user === void 0 ? void 0 : user.name) || "Anonymous",
                    ip: exports.getIpAddress(context.req),
                    _id: user === null || user === void 0 ? void 0 : user._id,
                    email: user === null || user === void 0 ? void 0 : user.email,
                    role: user === null || user === void 0 ? void 0 : user.role,
                },
                body: {
                    queryName: `${info.parentType.name}.${info.fieldName}`,
                    ...context.req.body,
                },
            },
            response: {
                headers: context.res.getHeaders(),
                data: resultData,
                errors,
            },
        };
        return log;
    }
}
exports.AccessLogging = AccessLogging;
//# sourceMappingURL=ErrorloggerMiddleware.js.map