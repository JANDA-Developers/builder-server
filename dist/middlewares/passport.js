"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
//------------jwt-------------------
const jwtOptions = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};
// 1 패킷에서 아이디찾음 아이디 = 이메일임
const verifyUser = async (jwt_payload, done) => {
    done(null, jwt_payload.id);
};
exports.authenticateJwt = (req, res, next) => passport_1.default.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
        console.log("authenticateJwt error : " + error);
        return;
    }
    console.log("77user");
    console.log(user);
    if (user) {
        req.user = user;
    }
    next();
})(req, res, next);
passport_1.default.use(new passport_jwt_1.Strategy(jwtOptions, verifyUser));
passport_1.default.initialize();
//# sourceMappingURL=passport.js.map