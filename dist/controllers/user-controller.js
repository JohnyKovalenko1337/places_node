"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
exports.getUserById = (req, res, next) => {
    const userId = req.params.userId;
    res.json({ message: 'success' });
};
