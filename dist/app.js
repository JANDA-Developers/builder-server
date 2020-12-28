"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const createSchema_1 = require("./utils/createSchema");
const createCollections_1 = require("./utils/createCollections");
const typegoose_1 = require("@typegoose/typegoose");
const express_session_1 = __importDefault(require("express-session"));
const variables_1 = require("./utils/variables");
const logger_1 = require("./logger");
const mongodb_1 = require("mongodb");
const httpFunctions_1 = require("./utils/httpFunctions");
const User_model_1 = require("./models/User/User.model");
const MongoStore = require("connect-mongo")(express_session_1.default);
class App {
    constructor() {
        this.gqlEndPoint = process.env.GRAPHQL_ENDPOINT || "/graphql";
        this.middlewares = () => {
            this.app.use(cors_1.default({
                credentials: true,
                origin: "*",
            }));
            this.app.use(helmet_1.default());
            // MongoDB for Session Storage
            this.app.use(express_session_1.default({
                name: "qid",
                secret: process.env.JD_TIMESPACE_SECRET || "",
                resave: false,
                saveUninitialized: false,
                store: new MongoStore({
                    mongooseConnection: typegoose_1.mongoose.connection,
                }),
                cookie: {
                    httpOnly: true,
                    sameSite: "lax",
                    secure: true,
                    domain: "stayjanda.cloud",
                    maxAge: variables_1.ONE_DAY * 14,
                },
            }));
            this.useLogger();
        };
        this.useLogger = () => {
            morgan_1.default.token("remote-addr", (req) => {
                const ffHeaderValue = req.headers["x-forwarded-for"];
                if (typeof ffHeaderValue === "string") {
                    return ffHeaderValue;
                }
                return ((ffHeaderValue && ffHeaderValue[0]) ||
                    req.connection.remoteAddress ||
                    "");
            });
            this.app.use(morgan_1.default(`[:date[iso]] :remote-addr :url(:method :status) :user-agent`));
        };
    }
    async init() {
        const playground = Boolean(process.env.ENABLE_PLAYGROUND).valueOf();
        this.app = express_1.default();
        const schema = await createSchema_1.createSchema();
        this.server = new apollo_server_express_1.ApolloServer({
            schema,
            context: async (context) => {
                const session = context.req.session;
                if (!session) {
                    return context;
                }
                const sellerId = session["seller"];
                if (sellerId) {
                    const user = await User_model_1.UserModel.findOne({
                        _id: session["seller"],
                    });
                    if (user) {
                        context["user"] = user;
                    }
                }
                return context;
            },
            uploads: {
                // 20MB
                maxFieldSize: 20480000,
            },
            formatError: (err) => {
                console.log(err);
                return err;
            },
            playground,
            plugins: [
                {
                    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                    requestDidStart: (requestContext) => {
                        const query = requestContext.request.query;
                        const time = Date.now();
                        const isNotIntrospectionQuery = query &&
                            !query.startsWith("query IntrospectionQuery");
                        let errorId;
                        return {
                            didEncounterErrors(ctx) {
                                // TODO: 로깅!
                                // query level error는 여기서 찍힘. But, Business level error는 그냥 통과함.
                                // 슬랙 Notification 필요.
                                if (isNotIntrospectionQuery) {
                                    errorId = new mongodb_1.ObjectId().toHexString();
                                    logger_1.loggerCloudWatch.error(JSON.stringify({
                                        errorId,
                                        errors: ctx.errors,
                                    }));
                                }
                            },
                            // 얘가 항상 마지막임.
                            willSendResponse(ctx) {
                                var _a;
                                // access logging & business level error logging
                                if (isNotIntrospectionQuery) {
                                    // TODO: 로깅!
                                    const user = ctx.context.user;
                                    const log = {
                                        resTime: Date.now() - time,
                                        request: {
                                            operation: (_a = ctx.operation) === null || _a === void 0 ? void 0 : _a.operation,
                                            httpHeaders: ctx.context.req.headers,
                                            user: {
                                                _id: user === null || user === void 0 ? void 0 : user._id,
                                                name: (user === null || user === void 0 ? void 0 : user.name) || "Anonymous",
                                                email: user === null || user === void 0 ? void 0 : user.email,
                                                role: user === null || user === void 0 ? void 0 : user.role,
                                                ip: httpFunctions_1.getIpAddress(ctx.context.req),
                                            },
                                            query: ctx.source,
                                            variables: ctx.request.variables,
                                        },
                                        response: {
                                            http: ctx.response.http,
                                            data: ctx.response.data,
                                            errors: ctx.response.errors ||
                                                ctx.errors,
                                        },
                                        errorId,
                                    };
                                    logger_1.loggerCloudWatch.info(JSON.stringify(log));
                                    // console.log(JSON.stringify(log));
                                }
                            },
                        };
                    },
                },
            ],
        });
        this.middlewares();
        this.server.applyMiddleware({
            app: this.app,
            path: this.gqlEndPoint,
            onHealthCheck: () => {
                return new Promise((resolve) => {
                    // DB상태 체크
                    // 테스트 쿼리 동작 확인
                    // Replace the `true` in this conditional with more specific checks!
                    // if (req.get("health")) {
                    resolve();
                    // } else {
                    //     reject("boooooooooooo");
                    // }
                });
            },
        });
        await createCollections_1.createCollections();
        return this.app;
    }
}
exports.default = new App();
//# sourceMappingURL=app.js.map