"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: "../.env",
});
const typegoose_1 = require("@typegoose/typegoose");
const app_1 = __importDefault(require("./app"));
const port = parseInt(process.env.PORT || "4000");
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const connectUri = process.env.DB_URI || dbUri;
console.log({ connectUri });
const main = async () => {
    typegoose_1.mongoose
        .connect(connectUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
        .then(async () => {
        const realApp = await app_1.default.init();
        realApp.listen({ port }, () => {
            console.log(`DB Connection: ${connectUri}`);
            console.log(`🚀 server listening at: http://${process.env.SERVER_URL}:${port}${process.env.GRAPHQL_ENDPOINT}`);
        });
    })
        .catch((err) => {
        console.log(err);
    });
};
main();
//# sourceMappingURL=index.js.map