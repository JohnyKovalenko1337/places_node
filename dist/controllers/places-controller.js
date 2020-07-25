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
exports.deletePlaceById = exports.updatePlaceById = exports.createPlace = exports.getPlacesByUserId = exports.getPlaceById = void 0;
const fs_1 = __importDefault(require("fs"));
const express_validator_1 = require("express-validator");
const http_errors_1 = __importDefault(require("../models/http-errors"));
const placeSchema_1 = __importDefault(require("../models/placeSchema"));
const userSchema_1 = __importDefault(require("../models/userSchema"));
const location_1 = __importDefault(require("../util/location"));
const mongoose_1 = __importDefault(require("mongoose"));
//===================================Get Place By ID ======================================
exports.getPlaceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.params.placeId;
    let place;
    try {
        place = yield placeSchema_1.default.findById(placeId);
    }
    catch (err) {
        return next(new http_errors_1.default('invalid inputs passed', 422));
    }
    res.json({ message: 'success', place: place.toObject() });
});
// ============================== get places by user ID =======================================
exports.getPlacesByUserId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    let places;
    try {
        places = yield userSchema_1.default.findById(userId).populate('places');
    }
    catch (err) {
        return next(new http_errors_1.default('Cant find any places by this id', 422));
    }
    if (!places || places.places.length === 0) {
        return next(new http_errors_1.default('Could not find places for the provided user id.', 404));
    }
    res.json({ message: 'success', place: places.places.map((place) => place.toObject({ getters: true })) });
});
// ============================================== create PLACE ==========================================
exports.createPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return next(new http_errors_1.default('invalid inputs passed', 422));
    }
    const { title, description, address, creator } = req.body;
    let coordinates;
    try {
        coordinates = yield location_1.default(address);
    }
    catch (error) {
        return next(error);
    }
    const createPlace = new placeSchema_1.default({
        title,
        description,
        address,
        location: coordinates,
        image: req.file.path.replace("\\", "/"),
        creator
    });
    let user;
    try {
        user = yield userSchema_1.default.findById(creator);
    }
    catch (err) {
        return next(new http_errors_1.default('Operation failed', 500));
    }
    ;
    if (!user) {
        return next(new http_errors_1.default('No user found for your creator id', 404));
    }
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        yield createPlace.save({ session: session });
        user.places.push(createPlace);
        yield user.save({ session: session });
        yield session.commitTransaction();
    }
    catch (error) {
        return next(new http_errors_1.default('cant save new place', 500));
    }
    res.status(201).json({ message: "place successfuly added", place: createPlace.toObject() });
});
// =========================== update Place by Id =======================================
exports.updatePlaceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422);
        return next(new http_errors_1.default('invalid inputs passed', 422));
    }
    const placeId = req.params.placeId;
    const { title, description } = req.body;
    let updatedPlace;
    try {
        updatedPlace = yield placeSchema_1.default.findById(placeId);
    }
    catch (err) {
        return next(new http_errors_1.default('cant find this place', 500));
    }
    if (updatedPlace.creator.toString() !== req.userData.userId) {
        return next(new http_errors_1.default('You are not allowed to edit this play', 401));
    }
    updatedPlace.title = title;
    updatedPlace.description = description;
    try {
        yield updatedPlace.save();
    }
    catch (err) {
        return next(new http_errors_1.default('Operation failed', 500));
    }
    res.status(201).json({ message: "place successfuly updated", place: updatedPlace.toObject() });
});
// =================================================== delete by id ==============================
exports.deletePlaceById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.params.placeId;
    let place;
    try {
        place = yield placeSchema_1.default.findById(placeId).populate('creator');
    }
    catch (err) {
        next(new http_errors_1.default('Operation failed', 500));
    }
    if (place.creator.id !== req.userData.userId) {
        return next(new http_errors_1.default('You are not allowed to delete this play', 401));
    }
    const ImagePath = place.image;
    try {
        const session = yield mongoose_1.default.startSession();
        session.startTransaction();
        yield place.remove({ session: session });
        place.creator.places.pull(place);
        yield place.creator.save({ session: session });
        yield session.commitTransaction();
    }
    catch (err) {
        next(new http_errors_1.default('Operation failed', 500));
    }
    fs_1.default.unlink(ImagePath, (err) => { console.log(err); });
    res.status(201).json({ message: "Place successfuly deleted" });
});
