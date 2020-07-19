import express, { Errback, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import HttpError from './models/http-errors';
import placesRouter from './routes/places-routes';

const app = express();

app.use(bodyParser.json());

app.use('/places', placesRouter);



app.listen({ port: 8000 });