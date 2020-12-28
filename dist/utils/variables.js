"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongoCollectionName = exports.SmsCollectionNamePrefix = exports.TimeUnit = exports.ONE_YEAR = exports.ONE_DAY = exports.ONE_HOUR = exports.ONE_MINUTE = void 0;
/**
 * 6000
 */
exports.ONE_MINUTE = 1000 * 60;
/**
 * 360000
 */
exports.ONE_HOUR = exports.ONE_MINUTE * 60;
/**
 * 86400000
 */
exports.ONE_DAY = exports.ONE_HOUR * 24;
exports.ONE_YEAR = exports.ONE_DAY * 365;
var TimeUnit;
(function (TimeUnit) {
    TimeUnit[TimeUnit["ONE_YEAR"] = 31536000000] = "ONE_YEAR";
    TimeUnit[TimeUnit["ONE_DAY"] = 86400000] = "ONE_DAY";
    TimeUnit[TimeUnit["ONE_HOUR"] = 3600000] = "ONE_HOUR";
    TimeUnit[TimeUnit["ONE_MINUTE"] = 60000] = "ONE_MINUTE";
})(TimeUnit = exports.TimeUnit || (exports.TimeUnit = {}));
exports.SmsCollectionNamePrefix = "SMS";
exports.mongoCollectionName = (collectionName) => collectionName;
//# sourceMappingURL=variables.js.map