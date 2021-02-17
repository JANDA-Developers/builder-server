"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ALLOW_MEMBER = exports.ALLOW_ALL = void 0;
const User_model_1 = require("../models/User/User.model");
exports.ALLOW_ALL = [
    User_model_1.UserRole.ADMIN,
    User_model_1.UserRole.MEMBER,
    User_model_1.UserRole.UNCONFIRMED,
];
exports.ALLOW_MEMBER = [User_model_1.UserRole.ADMIN, User_model_1.UserRole.MEMBER];
//# sourceMappingURL=const.js.map