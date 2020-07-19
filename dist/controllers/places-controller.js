"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPlace = exports.getPlaceById = void 0;
const http_errors_1 = __importDefault(require("../models/http-errors"));
const Dummy_Items = [
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
        throw new http_errors_1.default('Couldnt find place for your id', 404);
    }
    console.log(place);
    res.json({ message: 'success', place: place });
};
exports.createPlace = (req, res, next) => {
    const userId = req.params.userId;
    const place = Dummy_Items.find(p => {
        return p.id === userId;
    });
    if (!place) {
        throw new http_errors_1.default('Couldnt find place for your id', 404);
    }
    console.log(place);
};
