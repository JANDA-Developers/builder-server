import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, "../.env") });
import { mongoose } from "@typegoose/typegoose";
import app from "./app";

const port = parseInt(process.env.PORT || "4000");
const dbUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const connectUri = process.env.DB_URI || dbUri;

const main = async (): Promise<void> => {
    mongoose
        .connect(connectUri, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
        .then(async () => {
            const realApp = await app.init();
            realApp.listen({ port }, () => {
                console.log(`DB Connection: ${connectUri}`);
                console.log(
                    `🚀 server listening at: http://${process.env.SERVER_URL}:${port}${process.env.GRAPHQL_ENDPOINT}`
                );
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

main();
