"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("../models/http-errors"));
exports.auth = (req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    let token;
    try {
        token = req.headers.authorization.split(' ')[1]; //Authorization bearer token
        if (!token) {
            return next(new http_errors_1.default('Authorization failed', 500));
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        return next(new http_errors_1.default('Authorization failed', 500));
    }
};
