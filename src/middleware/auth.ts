import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import HttpError from '../models/http-errors';

export const auth = (req: Request | any, res: Response, next: NextFunction) => {

    if(req.method === "OPTIONS"){
        return next();
    }
    let token: string | undefined
    try {
        token = req.headers.authorization.split(' ')[1]; //Authorization bearer token
        if (!token) {
            return next(new HttpError('Authorization failed', 500))
        }
        const decodedToken: any = jwt.verify(token, 'secret_place');
        req.userData = { userId: decodedToken.userId };
        next();
    }
    catch (err) {
        return next(new HttpError('Authorization failed', 500))
    }

}