import { Request, Response, NextFunction } from 'express';
import { v4 } from 'uuid';
import HttpError from '../models/http-errors';
import { validationResult } from 'express-validator';
import { Place } from '../models/place-object';

let Dummy_Items: Array<Place> = [
    {
        id: 'p1',
        title: 'Louvre',
        imageUrl: 'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
        address: 'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
        description: 'One of the famoust museum',
        location: {
            lat: 48.8613684,
            lng: 2.3254948
        },
        creator: 'u1',
    },
    {
        id: 'p2',
        title: 'Louvre',
        imageUrl: 'https://s.france24.com/media/display/ffb00d5c-5bcb-11ea-9b68-005056a98db9/w:1280/p:16x9/5ebdce7c4db36aa769d6edb94f5b288f18ac266c.webp',
        address: 'Musée du Louvre, Cour Napoléon et Pyramide du Louvre, 75001 Paris',
        description: 'One of the famoust museum',
        location: {
            lat: 48.8613684,
            lng: 2.3254948
        },
        creator: 'u2',
    }
]

export const getPlaceById = (req: Request, res: Response, next: NextFunction) => {

    const placeId = req.params.placeId as string;

    const place: any = Dummy_Items.find(p => {
        return p.id === placeId;
    })
    if (!place) {
        return res.json({ message: 'Couldnt find place for your id' });
    }

    console.log(place);

    res.json({ message: 'success', place: place })
};

export const getPlacesByUserId = (req: Request, res: Response, next: NextFunction) => {

    const userId = req.params.userId as string;

    const places: any = Dummy_Items.filter(p => {
        return p.creator === userId;
    })
    if (!places || places.length === 0) {
        return res.json({ message: 'Couldnt find place for your user' });
    }

    console.log(places);

    res.json({ message: 'success', place: places })
};

export const createPlace = (req: Request, res: Response, next: NextFunction) => {
    const errors: any = validationResult(req);

    if(!errors.isEmpty()){
        res.status(422)
        throw new HttpError('invalid inputs passed', 422);
    }

    const { title, description, address, coordinates, creator } = req.body;

    const createPlace: Place = {
        id: v4(),
        title: title,
        description: description,
        imageUrl: 'a',
        address: address,
        location: coordinates,
        creator: creator
    }

    Dummy_Items.push(createPlace);

    res.status(201).json({ message: "place successfuly added", place: createPlace });
};

export const updatePlaceById = (req: Request, res: Response, next: NextFunction) => {

    const errors: any = validationResult(req);

    if(!errors.isEmpty()){
        res.status(422)
        throw new HttpError('invalid inputs passed', 422);
    }

    const placeId = req.params.placeId as string;

    const { title, description } = req.body;

    const updatedPlace: any = {
        ...Dummy_Items.find(p => {return p.id === placeId;}),
    };
    const placeIndex: any = Dummy_Items.findIndex(p => {return p.id === placeId;});

    updatedPlace.title = title;
    updatedPlace.description = description;

    Dummy_Items[placeIndex] = updatedPlace;     

    res.status(201).json({ message: "place successfuly updated", place: updatedPlace });

};

export const deletePlaceById = (req: Request, res: Response, next: NextFunction) => {
    const placeId = req.params.placeId as string;

    Dummy_Items = Dummy_Items.filter(p=> p.id !== placeId);
    res.status(201).json({message:"Place successfuly deleted", items: Dummy_Items});
};

