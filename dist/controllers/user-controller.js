"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = exports.getUserById = void 0;
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("../models/http-errors"));
exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;
    res.json({ message: 'success' });
};
exports.signUp = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422);
        throw new http_errors_1.default('invalid inputs passed', 422);
    }
};
exports.login = (req, res, next) => {
};
