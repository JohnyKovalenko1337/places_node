"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpError extends Error {
    constructor(message, errorCode) {
        super(message); // Add a message property for 
        this.code = errorCode;
        this.message = message;
    }
}
exports.default = HttpError;
