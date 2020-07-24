"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const file_upload_1 = require("../middleware/file-upload");
const places_controller_1 = require("../controllers/places-controller");
const router = express_1.default.Router();
router.get('/:placeId', places_controller_1.getPlaceById);
router.get('/user/:userId', places_controller_1.getPlacesByUserId);
router.post('/create', file_upload_1.fileUpload.single('image'), express_validator_1.check('title').notEmpty(), express_validator_1.check('description').isLength({ min: 5 }), express_validator_1.check('address').notEmpty(), places_controller_1.createPlace);
router.patch('/:placeId', express_validator_1.check('title').notEmpty(), express_validator_1.check('description').isLength({ min: 5 }), places_controller_1.updatePlaceById);
router.delete('/:placeId', places_controller_1.deletePlaceById);
exports.default = router;
