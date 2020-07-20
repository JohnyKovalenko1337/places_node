import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-errors';

export const getUserById = (req: Request, res: Response, next: NextFunction) => {

    const userId: string = req.params.userId;

    res.json({ message: 'success' })
};

export const signUp = (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422)
        throw new HttpError('invalid inputs passed', 422);
    }
};

export const login = (req: Request, res: Response, next: NextFunction) => {

};
