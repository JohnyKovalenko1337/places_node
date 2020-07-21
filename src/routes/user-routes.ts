import express from 'express';
import { getUsers, signUp, login } from '../controllers/user-controller';
import { check } from 'express-validator';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup',
    [
        check('name')
            .notEmpty()
            .isLength({ min: 3 }),
        check('email')
            .isEmail(),
        check('password')
            .isLength({ min: 6 })
    ],
    signUp);

router.post('/login',
    [
        check('email')
            .isEmail(),
        check('password')
            .isLength({ min: 6 })
    ],
    login);

export default router;