"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const places_routes_1 = __importDefault(require("./routes/places-routes"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/places', places_routes_1.default);
app.listen({ port: 8000 });
