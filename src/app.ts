/* eslint-disable @typescript-eslint/no-var-requires */
import cors from "cors";
import helmet from "helmet";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import express, { Express } from "express";
import { createSchema } from "./utils/createSchema";
import UploadRouter from "./api/Upload/router";
import { createCollections } from "./utils/createCollections";
import { UserModel } from "./models/User/User.model";
import { authenticateJwt } from "./middlewares/passport";
// @ts-ignore
import { version } from "../package.json";

class App {
    public server: ApolloServer;
    public app: Express;
    private gqlEndPoint: string = process.env.GRAPHQL_ENDPOINT || "/graphql";

    async init(): Promise<Express> {
        const playground = Boolean(process.env.ENABLE_PLAYGROUND).valueOf();
        this.app = express();

        const schema = await createSchema();

        this.server = new ApolloServer({
            schema,
            context: async ({ req, res }) => {
                const user = await UserModel.findOne({ email: req.user });
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
        await createCollections();
        return this.app;
    }

    private middlewares = (): void => {
        this.app.use((req, res) => {
            res.set("version", version);
        });
        this.app.use(authenticateJwt);
        this.app.use("/", UploadRouter);
        this.app.use(
            cors({
                credentials: true,
                origin: "*",
            })
        );
        this.app.use(helmet());
        this.useLogger();
    };

    private useLogger = (): void => {
        logger.token("remote-addr", (req) => {
            const ffHeaderValue = req.headers["x-forwarded-for"];
            if (typeof ffHeaderValue === "string") {
                return ffHeaderValue;
            }
            return (
                (ffHeaderValue && ffHeaderValue[0]) ||
                req.connection.remoteAddress ||
                ""
            );
        });
        this.app.use(
            logger(
                `[:date[iso]] :remote-addr :url(:method :status) :user-agent`
            )
        );
    };
}

export default new App();
