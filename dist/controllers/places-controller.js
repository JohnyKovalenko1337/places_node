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
const uuid_1 = require("uuid");
const http_errors_1 = __importDefault(require("../models/http-errors"));
const express_validator_1 = require("express-validator");
const location_1 = __importDefault(require("../util/location"));
let Dummy_Items = [
    {
        id: 'p1',
        title: 'Louvre',
        imageUrl: 'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
        address: 'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
        description: 'One of the famoust museum',
        location: {
            lat: 48.8613684,
            lng: 2.3254948
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        title: 'Louvre',
        imageUrl: 'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
        address: 'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
        description: 'One of the famoust museum',
        location: {
            lat: 48.8613684,
            lng: 2.3254948
        },
        creator: 'u2',
    }
];
exports.getPlaceById = (req, res, next) => {
    const placeId = req.params.placeId;
    const place = Dummy_Items.find(p => {
        return p.id === placeId;
    });
    if (!place) {
        return res.json({ message: 'Couldnt find place for your id' });
    }
    console.log(place);
    res.json({ message: 'success', place: place });
};
exports.getPlacesByUserId = (req, res, next) => {
    const userId = req.params.userId;
    const places = Dummy_Items.filter(p => {
        return p.creator === userId;
    });
    if (!places || places.length === 0) {
        return res.json({ message: 'Couldnt find place for your user' });
    }
    console.log(places);
    res.json({ message: 'success', place: places });
};
exports.createPlace = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        next(new http_errors_1.default('invalid inputs passed', 422));
    }
    const { title, description, address, creator } = req.body;
    let coordinates;
    try {
        coordinates = yield location_1.default(address);
    }
    catch (error) {
        return next(error);
    }
    const createPlace = {
        id: uuid_1.v4(),
        title: title,
        description: description,
        imageUrl: 'a',
        address: address,
        location: coordinates,
        creator: creator
    };
    Dummy_Items.push(createPlace);
    res.status(201).json({ message: "place successfuly added", place: createPlace });
});
exports.updatePlaceById = (req, res, next) => {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(422);
        throw new http_errors_1.default('invalid inputs passed', 422);
    }
    const placeId = req.params.placeId;
    const { title, description } = req.body;
    const updatedPlace = Object.assign({}, Dummy_Items.find(p => { return p.id === placeId; }));
    const placeIndex = Dummy_Items.findIndex(p => { return p.id === placeId; });
    updatedPlace.title = title;
    updatedPlace.description = description;
    Dummy_Items[placeIndex] = updatedPlace;
    res.status(201).json({ message: "place successfuly updated", place: updatedPlace });
};
exports.deletePlaceById = (req, res, next) => {
    const placeId = req.params.placeId;
    Dummy_Items = Dummy_Items.filter(p => p.id !== placeId);
    res.status(201).json({ message: "Place successfuly deleted", items: Dummy_Items });
};
