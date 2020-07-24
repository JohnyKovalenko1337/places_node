import { Request } from 'express';
import multer, { diskStorage } from 'multer';
import { v4 } from 'uuid'

const Mime_Type_Map:  any = {
    'image/png':'png',
    'image/jpg':'jpg',
    'image/jpeg':'jpeg'
}

export const fileUpload = multer({
    limits:{
        fileSize: 500000
    },
    storage: multer.diskStorage({
        destination: (req: Request, file: any, cb)=>{
            cb(null, 'uploads/images')
        },
        filename: (req: Request, file: any, cb)=>{
            const ext: any = Mime_Type_Map[file.mimetype];
            cb(null, v4());
        },
        
    }),
    fileFilter: (req: Request, file: any, cb)=>{
        const isValid: boolean | undefined = !!Mime_Type_Map[file.mimetype];
        let err: any = isValid ? null: new Error('Invalid mimetype');
        cb(err, isValid)
    },

});