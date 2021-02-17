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
const router_1 = __importDefault(require("./api/Upload/router"));
const createCollections_1 = require("./utils/createCollections");
const User_model_1 = require("./models/User/User.model");
const passport_1 = require("./middlewares/passport");
// @ts-ignore
const package_json_1 = require("../package.json");
class App {
    constructor() {
        this.gqlEndPoint = process.env.GRAPHQL_ENDPOINT || "/graphql";
        this.middlewares = () => {
            this.app.use((req, res, next) => {
                res.set("version", package_json_1.version);
                next();
            });
            this.app.use(passport_1.authenticateJwt);
            this.app.use("/", router_1.default);
            this.app.use(cors_1.default({
                credentials: true,
                origin: "*",
            }));
            this.app.use(helmet_1.default());
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
            context: async ({ req, res }) => {
                const user = await User_model_1.UserModel.findOne({ email: req.user });
                return {
                    user,
                    req,
                    res,
                };
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
        });
        this.middlewares();
        this.server.applyMiddleware({
            app: this.app,
            path: this.gqlEndPoint,
            onHealthCheck: () => {
                return new Promise((resolve) => {
                    resolve("");
                });
            },
        });
        await createCollections_1.createCollections();
        return this.app;
    }
}
exports.default = new App();
//# sourceMappingURL=app.js.map