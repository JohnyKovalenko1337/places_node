import express from 'express';
import { check } from 'express-validator';
import { fileUpload } from '../middleware/file-upload';
import { getUsers, signUp, login } from '../controllers/user-controller';

const router = express.Router();

router.get('/', getUsers);

router.post('/signup',
    fileUpload.single('image'),
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