"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const uuid_1 = require("uuid");
const Mime_Type_Map = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
};
exports.fileUpload = multer_1.default({
    limits: {
        fileSize: 500000
    },
    storage: multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, file, cb) => {
            const ext = Mime_Type_Map[file.mimetype];
            cb(null, uuid_1.v4());
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!Mime_Type_Map[file.mimetype];
        let err = isValid ? null : new Error('Invalid mimetype');
        cb(err, isValid);
    },
});
