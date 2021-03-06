"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    places: [{
            type: mongoose_1.default.Types.ObjectId,
            required: true,
            ref: "Place"
        }]
});
exports.default = mongoose_1.default.model('User', userSchema);
