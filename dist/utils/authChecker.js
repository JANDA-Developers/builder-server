"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authChecker = void 0;
// create auth checker function
exports.authChecker = ({ context }, roles) => {
    const { user } = context;
    if (!roles.includes(user.role)) {
        return false;
    }
    console.log(roles);
    return !!user;
};
//# sourceMappingURL=authChecker.js.map