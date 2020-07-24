import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-errors';
import User from '../models/userSchema';
import { iUser } from '../models/iUser';    
import Place from '../models/placeSchema';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    let users: any[];
    try {
        users = await User.find({}, '-password');
    }
    catch (err) {
        return next(new HttpError('Failed operation', 500));
    }

    res.json({ message: 'success', users: users })
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        next(new HttpError('invalid inputs passed', 422));
    }
    const { name, email, password } = req.body;

    let existingUser: iUser | any;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        next(new HttpError('Failed operation', 500));
    }
    if (existingUser) {
        return next(new HttpError('User with this email already exists', 422));
    }
    const createUser: iUser | any = new User({
        name,
        email,
        image: req.file.path.replace("\\", "/"),
        password,
        places: []
    });
    try {
        await createUser.save()
    }
    catch (error) {
        next(new HttpError('cant save new place', 500));
    }
    res.status(201).json({ message: "place successfuly added", user: createUser });

};

export const login = async (req: Request, res: Response, next: NextFunction) => {

    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('invalid inputs passed', 422));
    }

    const { email, password } = req.body;

    let existingUser: iUser |any;
    try {
        existingUser = await User.findOne({ email: email, password: password });
    }
    catch (err) {
        return next(new HttpError('Failed operation', 500));
    }

    if (!existingUser) {
        return next(new HttpError('Invalid email or password', 422));
    }

    res.status(201).json({
        message: "User successfuly loggined",
        user: existingUser.toObject({ getters: true })
    });

};
