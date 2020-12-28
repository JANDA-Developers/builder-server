"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testConn = exports.getDBUri = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const createCollections_1 = require("../utils/createCollections");
exports.getDBUri = ({ cluster, name, password, user, } = {
    name: process.env.DB_NAME || "",
    cluster: process.env.DB_CLUSTER || "",
    user: process.env.DB_USER || "",
    password: process.env.DB_PASSWORD || "",
}) => {
    return `mongodb+srv://${user}:${password}@${cluster}.mongodb.net/${name}?retryWrites=true&w=majority`;
};
exports.testConn = async (dbUri = exports.getDBUri(), runCreateCollections, dropCollection) => {
    await typegoose_1.mongoose
        .connect(dbUri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    })
        .then(async () => {
        if (runCreateCollections) {
            await createCollections_1.createCollections(dropCollection);
        }
        if (dropCollection) {
            console.log("Let's drop all collection~! (Under Development");
        }
    });
};
//# sourceMappingURL=testConn.js.map