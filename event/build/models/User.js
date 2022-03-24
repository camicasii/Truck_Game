"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { Schema } = mongoose_1.default;
const UserSchema = new Schema({
    address: {
        type: String,
        required: false,
        unique: false,
    },
    nonce: {
        type: String,
        required: false,
    },
    name: {
        type: String,
        require: false,
    },
    email: {
        type: String,
        required: false,
    },
    BUSD: {
        type: String,
        required: false,
    },
    sdl: {
        type: String,
        required: false,
    },
    date: {
        type: String,
        required: false,
    },
});
exports.default = mongoose_1.default.model('User', UserSchema);
