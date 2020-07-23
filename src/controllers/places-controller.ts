import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import { validationResult } from 'express-validator';

import HttpError from '../models/http-errors';
import PlaceSchema from '../models/placeSchema';
import User from '../models/userSchema';
import getCoord from '../util/location';
import { hrtime } from 'process';
import mongoose from 'mongoose';


//===================================Get Place By ID ======================================
export const getPlaceById = async (req: Request, res: Response, next: NextFunction) => {

    const placeId = req.params.placeId as string;
    let place: any;
    try {
        place = await PlaceSchema.findById(placeId)

    }
    catch (err) {
        return next(new HttpError('invalid inputs passed', 422));
    }
    res.json({ message: 'success', place: place.toObject() })
};

// ============================== get places by user ID =======================================
export const getPlacesByUserId = async (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId as string;

    let places: any
    try {
        places = await User.findById(userId).populate('places');
    }
    catch (err) {
        return next(new HttpError('Cant find any places by this id', 422));
    }

    if (!places || places.places.length === 0) {
        return next(
          new HttpError('Could not find places for the provided user id.', 404)
        );
      }

    res.json({ message: 'success', place: places.places.map((place:any) => place.toObject({ getters: true }))  })
};
// ============================================== create PLACE ==========================================
export const createPlace = async (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('invalid inputs passed', 422));
    }

    const { title, description, address, creator } = req.body;
    let coordinates;
    try {
        coordinates = await getCoord(address);
    }
    catch (error) {
        return next(error);
    }

    const createPlace: any = new PlaceSchema({
        title,
        description,
        address,
        location: coordinates,
        imageUrl: 'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
        creator
    })


    let user: any;


    try {
        user = await User.findById(creator);
    }
    catch (err) {
        return next(new HttpError('Operation failed', 500));
    };
    if (!user) {
        return next(new HttpError('No user found for your creator id', 404));
    }

    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await createPlace.save({ session: session });
        user.places.push(createPlace);
        await user.save({ session: session });
        await session.commitTransaction();
    }
    catch (error) {
        return next(new HttpError('cant save new place', 500));
    }
    res.status(201).json({ message: "place successfuly added", place: createPlace.toObject() });

};
// =========================== update Place by Id =======================================
export const updatePlaceById = async (req: Request, res: Response, next: NextFunction) => {

    const errors: any = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(422)
        next(new HttpError('invalid inputs passed', 422));
    }

    const placeId = req.params.placeId as any;

    const { title, description } = req.body;

    let updatedPlace: any;
    try {
        updatedPlace = await PlaceSchema.findById(placeId);
    }
    catch (err) {
        next(new HttpError('cant find this place', 500));
    }

    updatedPlace.title = title;
    updatedPlace.description = description;

    try {
        await updatedPlace.save()
    }
    catch (err) {
        next(new HttpError('Operation failed', 500));

    }

    res.status(201).json({ message: "place successfuly updated", place: updatedPlace.toObject() });

};
// =================================================== delete by id ==============================
export const deletePlaceById = async (req: Request, res: Response, next: NextFunction) => {
    const placeId = req.params.placeId as string;

    let place: any;
    try {
        place = await PlaceSchema.findById(placeId).populate('creator');
    }
    catch (err) {
        next(new HttpError('Operation failed', 500));
    }


    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await place.remove({ session: session });
        place.creator.places.pull(place);
        await place.creator.save({ session: session });
        await session.commitTransaction();
    }
    catch (err) {
        next(new HttpError('Operation failed', 500));

    }

    res.status(201).json({ message: "Place successfuly deleted" });
};
