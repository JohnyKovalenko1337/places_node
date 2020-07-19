export interface Place{
    id:string,
    title:string,
    imageUrl:string,
    address:string,
    description:string,
    location:{
        lat:number,
        lng:number
    },
    creator:string
}