import axios from 'axios';
import HttpError from '../models/http-errors';

const API_KEY: string | undefined = process.env.GOOGLE_API;

const getCoordinatesFromAddress = async (address: string)=>{


    const responce = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
        );
    
    const data: any = responce.data;
    
    if(!data || data.status === 'ZERO_RESULTS'){
        const errors: any = new HttpError('Couldnt find an object for this address', 422);
        throw errors;
    }

    const coordinates = data.results[0].geometry.location

    return coordinates;   
}

export default getCoordinatesFromAddress;