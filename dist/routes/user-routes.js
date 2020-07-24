"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const file_upload_1 = require("../middleware/file-upload");
const user_controller_1 = require("../controllers/user-controller");
const router = express_1.default.Router();
router.get('/', user_controller_1.getUsers);
router.post('/signup', file_upload_1.fileUpload.single('image'), [
    express_validator_1.check('name')
        .notEmpty()
        .isLength({ min: 3 }),
    express_validator_1.check('email')
        .isEmail(),
    express_validator_1.check('password')
        .isLength({ min: 6 })
], user_controller_1.signUp);
router.post('/login', [
    express_validator_1.check('email')
        .isEmail(),
    express_validator_1.check('password')
        .isLength({ min: 6 })
], user_controller_1.login);
exports.default = router;
