import { UserRole } from "../models/User/User.model";

export const ALLOW_ALL = [
    UserRole.ADMIN,
    UserRole.MEMBER,
    UserRole.UNCONFIRMED,
];

export const ALLOW_MEMBER = [UserRole.ADMIN, UserRole.MEMBER];
