import express, { Errback, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import HttpError from './models/http-errors';
import placesRouter from './routes/places-routes';
import UserRouter from './routes/user-routes';

const app = express();

app.use(bodyParser.json());

app.use('/places', placesRouter);

app.use('/user', UserRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
    const error = new HttpError('Couldnt find this route', 404);
    return res.json({ message: error.message });
})

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = error.code || 500;
    const message = error.message || 'Something went wrong';

    return res
        .status(status)
        .json({
            message: message,
        })
})

mongoose.connect('mongodb+srv://sadJo:qwerty123456@placedb.gjnu9.mongodb.net/places?retryWrites=true&w=majority',
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen({ port: 8000 });
    })
    .catch(() => {
        console.log('failed to mongodb')
    })
