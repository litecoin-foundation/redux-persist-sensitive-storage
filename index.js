"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_native_sensitive_info_1 = __importDefault(require("react-native-sensitive-info"));
function default_1(options = {}) {
    const extractKeys = react_native_1.Platform.select({
        android: Object.keys,
        ios: (items) => items[0].map((item) => item.key)
    });
    function noop() {
        return null;
    }
    return {
        async getItem(key, callback = noop) {
            try {
                let result = await react_native_sensitive_info_1.default.getItem(key, options);
                if (typeof result === 'undefined') {
                    result = null;
                }
                callback(null, result);
                return result;
            }
            catch (error) {
                callback(error);
                throw error;
            }
        },
        async setItem(key, value, callback = noop) {
            try {
                await react_native_sensitive_info_1.default.setItem(key, value, options);
                callback(null);
            }
            catch (error) {
                callback(error);
                throw error;
            }
        },
        async removeItem(key, callback = noop) {
            try {
                await react_native_sensitive_info_1.default.deleteItem(key, options);
                callback(null);
            }
            catch (error) {
                callback(error);
                throw error;
            }
        },
        async getAllKeys(callback = noop) {
            try {
                const values = await react_native_sensitive_info_1.default.getAllItems(options);
                if (typeof extractKeys === 'undefined') {
                    throw new Error('Platform not supported');
                }
                const result = extractKeys(values);
                callback(null, result);
                return result;
            }
            catch (error) {
                callback(error);
                throw error;
            }
        }
    };
}
exports.default = default_1;
