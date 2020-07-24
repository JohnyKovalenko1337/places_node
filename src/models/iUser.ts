import { iPlace } from './iPlace';
export interface iUser{
    name: string,
    email: string,
    password: string,
    image: any,
    places: Array<iPlace>
}