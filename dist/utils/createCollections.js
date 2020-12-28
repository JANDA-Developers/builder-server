"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCollections = void 0;
const _exported_1 = __importDefault(require("../models/_exported"));
exports.createCollections = async (dropAllCollection) => {
    const myCollections = _exported_1.default;
    for (const model of myCollections) {
        const list = await model.db.db
            .listCollections({
            name: model.collection.name,
        })
            .toArray();
        // console.log(JSON.stringify(list, undefined, 2));
        if (list.length === 0) {
            await model
                .createCollection()
                .then(() => {
                console.log("collection %s is created", model.collection.name);
            })
                .catch(() => {
                console.log("%s collection create is failed", model.collection.name);
            });
        }
        else {
            console.log("collection %s is exist", model.collection.name);
            if (dropAllCollection) {
                await model.collection
                    .drop()
                    .then(async () => {
                    await model
                        .createCollection()
                        .then(() => {
                        console.log("collection %s is created", model.collection.name);
                    })
                        .catch(() => {
                        console.log("%s collection create is failed", model.collection.name);
                    });
                })
                    .catch(() => {
                    console.log("%s collection drop is failed", model.collection.name);
                });
            }
        }
    }
};
//# sourceMappingURL=createCollections.js.map