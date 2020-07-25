"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signUp = exports.getUsers = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_errors_1 = __importDefault(require("../models/http-errors"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
// ====================================GET USERS========================================
exports.getUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let users;
    try {
        users = yield userSchema_1.default.find({}, '-password');
    }
    catch (err) {
        return next(new http_errors_1.default('Failed operation', 500));
    }
    res.json({ message: 'success', users: users });
});
// ======================================= SIGNUP ==========================================
exports.signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        next(new http_errors_1.default('invalid inputs passed', 422));
    }
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield userSchema_1.default.findOne({ email: email });
    }
    catch (err) {
        next(new http_errors_1.default('Failed operation', 500));
    }
    if (existingUser) {
        return next(new http_errors_1.default('User with this email already exists', 422));
    }
    let hashedPassword;
    try {
        hashedPassword = yield bcrypt_1.default.hash(password, 12);
    }
    catch (err) {
        return next(new http_errors_1.default('Cant hash ur password', 500));
    }
    const createUser = new userSchema_1.default({
        name,
        email,
        image: req.file.path.replace("\\", "/"),
        password: hashedPassword,
        places: []
    });
    try {
        yield createUser.save();
    }
    catch (error) {
        next(new http_errors_1.default('cant save new user', 500));
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({
            userId: createUser.id,
            email: createUser.email
        }, 'secret_place', { expiresIn: '1h' });
    }
    catch (err) {
        next(new http_errors_1.default('Something went wrong with token, we are so sorry', 500));
    }
    res.status(201).json({ token: token, userId: createUser.id, email: createUser.email });
});
// ===================================== LOGIN ========================================
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new http_errors_1.default('invalid inputs passed', 422));
    }
    const { email, password } = req.body;
    let existingUser;
    try {
        existingUser = yield userSchema_1.default.findOne({ email: email });
    }
    catch (err) {
        return next(new http_errors_1.default('Failed operation', 500));
    }
    if (!existingUser) {
        return next(new http_errors_1.default('Invalid email', 403));
    }
    let isValidPassword = false;
    try {
        isValidPassword = yield bcrypt_1.default.compare(password, existingUser.password);
    }
    catch (err) {
        return next(new http_errors_1.default('Invalid password', 401));
    }
    if (!isValidPassword) {
        return next(new http_errors_1.default('Invalid password', 403));
    }
    let token;
    try {
        token = jsonwebtoken_1.default.sign({
            userId: existingUser.id,
            email: existingUser.email
        }, 'secret_place', { expiresIn: '1h' });
    }
    catch (err) {
        next(new http_errors_1.default('Something went wrong with token, we are so sorry', 500));
    }
    res.status(201).json({
        message: "User successfuly loggined",
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });
});
