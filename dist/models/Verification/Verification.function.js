"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSmsVerificationCode = exports.verificationCreate = exports.verificationFind = void 0;
const Verification_type_1 = require("./Verification.type");
const errorHandling_1 = require("../../helpers/errorHandling");
const variables_1 = require("../../utils/variables");
const Error_type_1 = require("../../api/Error/shared/Error.type");
exports.verificationFind = async (id) => {
    const verification = await Verification_type_1.VerificationModel.findById(id);
    if (!verification) {
        throw new Error_type_1.UserError("Unexist Verification", "NOTHING_MATCH_WITH_ID");
    }
    return verification;
};
exports.verificationCreate = async (input) => {
    const verification = new Verification_type_1.VerificationModel(input);
    verification.codeGenerate();
    verification.storeGroupCode = input.storeGroupCode;
    verification.expiresAt = new Date(Date.now() + variables_1.ONE_MINUTE * 5);
    await errorHandling_1.validateClass(verification);
    return verification;
};
/**
 * verification 객체를 통해 Confirmation Code 전송
 * @param verification 이미 해당 객체는 class-validator.validate 함수를 거친 것만 들어와야함.
 */
exports.sendSmsVerificationCode = async (verification) => {
    await errorHandling_1.validateClass(verification);
    // TODO: 여기서부터 시작!! Send SMS 함수 timespace쪽에서 가져와서 사용하긔
};
//# sourceMappingURL=Verification.function.js.map