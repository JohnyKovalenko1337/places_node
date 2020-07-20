import express, { Errback, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import HttpError from './models/http-errors';
import placesRouter from './routes/places-routes';

const app = express();

app.use(bodyParser.json());

app.use('/places', placesRouter);


app.use((req: Request, res: Response, next: NextFunction)=>{
    const error = new HttpError('Couldnt find this route', 404);
    return res.json({message:error.message});
})

app.use((error: HttpError, req: Request, res: Response, next: NextFunction) => {
    const status = error.code || 500;
    const message = error.message || 'Something went wrong';

    if(!res.headersSent){
        return next(error);
    }

    res
        .status(status)
        .json({
            message: message,
        })
})

app.listen({ port: 8000 });