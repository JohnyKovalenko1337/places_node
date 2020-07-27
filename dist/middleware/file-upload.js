"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const s3 = new aws_sdk_1.default.S3({
    accessKeyId: 'AKIAZEV2VUWLW3BXFOU5',
    secretAccessKey: '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',
});
const Mime_Type_Map = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
};
exports.fileUpload = multer_1.default({
    storage: multer_s3_1.default({
        s3: s3,
        bucket: 'image-storing-bucket',
        key: function (req, file, cb) {
            cb(null, path_1.default.basename(file.originalname, path_1.default.extname(file.originalname)) + '-' + Date.now() + path_1.default.extname(file.originalname));
        }
    }),
    limits: { fileSize: 2000000 },
    fileFilter: (req, file, cb) => {
        const isValid = !!Mime_Type_Map[file.mimetype];
        let err = isValid ? null : new Error('Invalid mimetype');
        cb(err, isValid);
    }
});
