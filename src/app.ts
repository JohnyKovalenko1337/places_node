import express, { Errback, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import fs from 'fs';

import HttpError from './models/http-errors';
import placesRouter from './routes/places-routes';
import UserRouter from './routes/user-routes';

const app = express();


const MONGO_URL : string =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@placedb.gjnu9.mongodb.net/${process.env.DB_NAME}`;

app.use(bodyParser.json());



app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH, PUT');
    next();
});

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

mongoose.connect(MONGO_URL,
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        app.listen({ port: 8000 });
    })
    .catch(() => {
        console.log('failed to mongodb')
    })
