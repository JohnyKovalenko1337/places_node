import express from 'express';

import { getPlaceById } from '../controllers/places-controller';

const router = express.Router();

router.get('/:placeId', getPlaceById);

export default router;