import { Request, Response, NextFunction } from 'express';
import HttpError from '../models/http-errors';

export const getUserById = (req: Request, res: Response, next: NextFunction) => {

    const userId: string = req.params.userId;

    res.json({ message: 'success' })
};