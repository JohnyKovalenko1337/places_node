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
const axios_1 = __importDefault(require("axios"));
const http_errors_1 = __importDefault(require("../models/http-errors"));
const API_KEY = process.env.GOOGLE_API;
const getCoordinatesFromAddress = (address) => __awaiter(void 0, void 0, void 0, function* () {
    const responce = yield axios_1.default.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`);
    const data = responce.data;
    if (!data || data.status === 'ZERO_RESULTS') {
        const errors = new http_errors_1.default('Couldnt find an object for this address', 422);
        throw errors;
    }
    const coordinates = data.results[0].geometry.location;
    return coordinates;
});
exports.default = getCoordinatesFromAddress;
