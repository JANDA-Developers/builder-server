import { DocumentType } from "@typegoose/typegoose";
import { ClientSession } from "mongoose";
import { User } from "../models/User/User.model";

export type UserDecodeByJwt = {
    _id: string;
    name: string;
    updatedAt: string;
    timezone: string;
    email: string;
    profileImg: string;
    phoneNumber: string;
    callingCode: string;
};

export type Hour = number;
export type Minute = number;
export type Seconds = number;

export type Context = {
    session?: ClientSession;
    user?: DocumentType<User>;
    res: any;
    req: any;
};
