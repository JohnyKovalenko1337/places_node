import { Request, Response, NextFunction } from 'express';
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
        throw new HttpError('Couldnt find place for your id', 404);
    }

    console.log(place);

    res.json({ message: 'success', place: place })
};

export const createPlace = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId as string;

    const place: any = Dummy_Items.find(p => {
        return p.id === userId;
    })
    if (!place) {
        throw new HttpError('Couldnt find place for your id', 404);
    }

    console.log(place);

};