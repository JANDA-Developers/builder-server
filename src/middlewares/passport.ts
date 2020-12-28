import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Request, Response, NextFunction } from "express";
//------------jwt-------------------
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

// 1 패킷에서 아이디찾음 아이디 = 이메일임
const verifyUser = async (jwt_payload: any, done: any) => {
    done(null, jwt_payload.id);
};

export const authenticateJwt = (
    req: Request,
    res: Response,
    next: NextFunction
) =>
    passport.authenticate("jwt", { session: false }, (error, user) => {
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

passport.use(new Strategy(jwtOptions, verifyUser));

passport.initialize();
