import express from 'express';
import { getUserById, signUp, login } from '../controllers/user-controller';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', getUserById);

router.post('/signup',
    [
        check('name')
        .notEmpty()
        .isLength({min:3}),
        check('email')
        .isEmail(),
        check('password')
        .isLength({min:6})
    ],
    signUp);

router.post('/login', login);

export default router;