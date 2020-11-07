import { Request } from 'express';
import multer, { diskStorage } from 'multer';
import path from 'path';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

const s3: AWS.S3 = new aws.S3({
    accessKeyId: 'AKIxxxU5',
    secretAccessKey: 'xxruORGw8TRpWmBsVU',
    
});


const Mime_Type_Map: any = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}

export const fileUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'image-storing-bucket',
        key: function (req, file, cb) {
            cb(null, path.basename(file.originalname, path.extname(file.originalname)) + '-' + Date.now() + path.extname(file.originalname))
        }
    }),
    limits: { fileSize: 2000000 },
    fileFilter: (req: Request, file: any, cb) => {
        const isValid: boolean | undefined = !!Mime_Type_Map[file.mimetype];
        let err: any = isValid ? null : new Error('Invalid mimetype');
        cb(err, isValid)
    }
});



