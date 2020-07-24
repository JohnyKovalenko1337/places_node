export interface iPlace{
    title:string,
    description: string,
    address: string,
    image: any,
    location:{
        lat:number,
        lng:number
    },
    creator: any
}