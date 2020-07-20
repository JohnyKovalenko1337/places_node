import { Request, Response, NextFunction } from 'express';
import { v4 }  from 'uuid' ; 
import HttpError from '../models/http-errors';
import { Place } from '../models/place-object';

const Dummy_Items: Array<Place> = [
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
        return res.json({message:'Couldnt find place for your id'});
    }

    console.log(place);

    res.json({ message: 'success', place: place })
};

export const createPlace = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId as string;

    const {  title, description, address, coordinates, creator } = req.body;

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

    res.status(201).json({message:"place successfuly added", place: createPlace});
};