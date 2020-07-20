"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_errors_1 = __importDefault(require("./models/http-errors"));
const places_routes_1 = __importDefault(require("./routes/places-routes"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use('/places', places_routes_1.default);
app.use((req, res, next) => {
    const error = new http_errors_1.default('Couldnt find this route', 404);
    return res.json({ message: error.message });
});
app.use((error, req, res, next) => {
    const status = error.code || 500;
    const message = error.message || 'Something went wrong';
    if (!res.headersSent) {
        return next(error);
    }
    res
        .status(status)
        .json({
        message: message,
    });
});
app.listen({ port: 8000 });
