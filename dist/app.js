"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const body_parser_1 = __importDefault(require("body-parser"));
const app = express();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.send('<h1>asda</h1>');
});
app.listen({ port: 8000 });