import express from 'express';

import { getPlaceById, createPlace } from '../controllers/places-controller';

const router = express.Router();

router.get('/:placeId', getPlaceById);

router.post('/create', createPlace);

export default router;