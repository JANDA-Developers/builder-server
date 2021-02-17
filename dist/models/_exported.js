"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const File_type_1 = require("./File/File.type");
const User_model_1 = require("./User/User.model");
const WebPage_model_1 = require("./WebPage/WebPage.model");
// DB에 정의해야 하는 Schema 클래스들 목록을 집어넣는다.
exports.default = [User_model_1.UserModel, File_type_1.FileModel, WebPage_model_1.WebPageModel];
//# sourceMappingURL=_exported.js.map