import express from 'express';
import { check } from 'express-validator';
import { fileUpload } from '../middleware/file-upload';
import { getPlaceById, createPlace, getPlacesByUserId, updatePlaceById, deletePlaceById } from '../controllers/places-controller';

const router = express.Router();

router.get('/:placeId', getPlaceById);

router.get('/user/:userId', getPlacesByUserId);

router.post('/create',
    fileUpload.single('image'),
    check('title').notEmpty(),
    check('description').isLength({ min: 5 }),
    check('address').notEmpty(),
    createPlace
);

router.patch('/:placeId',
    check('title').notEmpty(),
    check('description').isLength({ min: 5 }),
    updatePlaceById
);

router.delete('/:placeId', deletePlaceById)

export default router;