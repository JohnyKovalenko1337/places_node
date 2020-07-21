import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import HttpError from '../models/http-errors';
import User from '../models/userSchema';
import Place from '../models/placeSchema';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {

    //onst userId: string = req.params.userId;
    let users: any;
    try {
        users = await User.find({}, 'email name');
    }
    catch (err) {
        next(new HttpError('Failed operation', 500));
    }

    res.json({ message: 'success', users: users.toObject() })
};

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        next(new HttpError('invalid inputs passed', 422));
    }
    const { name, email, password } = req.body;

    let existingUser: any;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        next(new HttpError('Failed operation', 500));
    }
    if (existingUser) {
        return next(new HttpError('User with this email already exists', 422));
    }
    const createUser: any = new User({
        name,
        email,
        imageUrl: 'https://i.pinimg.com/originals/92/c2/f0/92c2f03407ee7bc8dab7c2962388a139.jpg',
        password,
        places: []
    });
    try {
        await createUser.save()
    }
    catch (error) {
        next(new HttpError('cant save new place', 500));
    }
    res.status(201).json({ message: "place successfuly added", user: createUser.toObject() });

};

export const login = async (req: Request, res: Response, next: NextFunction) => {

    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        next(new HttpError('invalid inputs passed', 422));
    }

    const { email, password } = req.body;

    let existingUser: any;
    try {
        existingUser = await User.findOne({ email: email, password: password });
    }
    catch (err) {
        next(new HttpError('Failed operation', 500));
    }

    if (!existingUser) {
        next(new HttpError('Invalid email or password', 422));
    }

    res.status(201).json({ message: "User successfuly loggined" });

};
