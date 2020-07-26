import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import HttpError from '../models/http-errors';
import User from '../models/userSchema';
import { iUser } from '../models/iUser';

// ====================================GET USERS========================================
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
// ======================================= SIGNUP ==========================================
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

    let hashedPassword: any;
    try {
        hashedPassword = await bcrypt.hash(password, 12);
    }
    catch (err) {
        return next(new HttpError('Cant hash ur password', 500));
    }
    const createUser: iUser | any = new User({
        name,
        email,
        image: req.file.path.replace("\\", "/"),
        password: hashedPassword,
        places: []
    });
    try {
        await createUser.save()
    }
    catch (error) {
        next(new HttpError('cant save new user', 500));
    }

    let token: any;

    try {
        token = jwt.sign(
            {
                userId: createUser.id,
                email: createUser.email
            },
            process.env.JWT_KEY as string,
            { expiresIn: '1h' }
        );
    }
    catch (err) {
        next(new HttpError('Something went wrong with token, we are so sorry', 500));
    }


    res.status(201).json({ token: token, userId: createUser.id,  email: createUser.email });

};
// ===================================== LOGIN ========================================
export const login = async (req: Request, res: Response, next: NextFunction) => {

    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('invalid inputs passed', 422));
    }

    const { email, password } = req.body;

    let existingUser: iUser | any;
    try {
        existingUser = await User.findOne({ email: email });
    }
    catch (err) {
        return next(new HttpError('Failed operation', 500));
    }

    if (!existingUser) {
        return next(new HttpError('Invalid email', 403));
    }
    let isValidPassword: boolean = false;

    try {
        isValidPassword = await bcrypt.compare(password, existingUser.password);
    }
    catch (err) {
        return next(new HttpError('Invalid password', 401));
    }

    if (!isValidPassword) {
        return next(new HttpError('Invalid password', 403));
    }

    
    let token: any;

    try {
        token = jwt.sign(
            {
                userId: existingUser.id,
                email: existingUser.email
            },
            process.env.JWT_KEY as string,
            { expiresIn: '1h' }
        );
    }
    catch (err) {
        next(new HttpError('Something went wrong with token, we are so sorry', 500));
    }

    res.status(201).json({
        message: "User successfuly loggined",
        userId: existingUser.id,
        email: existingUser.email,
        token: token
    });

};
