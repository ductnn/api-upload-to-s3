import { Application, Request, Response, Router } from "express"

import { config } from "../config";
import { routeResSuccess } from "../utils";


const S3 = require("aws-sdk/clients/s3");
const Busboy = require("busboy");
const { v4: uuidv4 } = require("uuid");


// Config AWS
const AWS_ACCESS_KEY = config.s3.aws_access_key;
const AWS_SECRET_KEY = config.s3.aws_secret_key;
const AWS_REGION_DEFAULT = config.s3.aws_region_default;
const AWS_BUCKET_NAME = config.s3.aws_bucket_name;


const upload = async (req: Request, res: Response) => {
    try {
        let chunks: any = [];
        let fileName: any = null;
        let mimeType: any = null;

        const options = {
            accessKeyId: AWS_ACCESS_KEY,
            secretKey: AWS_SECRET_KEY,
            region: AWS_REGION_DEFAULT,
        }

        let s3 = new S3(options);
        var busboy = new Busboy({ headers: req.headers });

        busboy.on('file', (fieldname: any, file: any, filename: any, encoding: any, mimetype: any) => {
            console.log(
                'File [' + fieldname + '] filename: ' + filename + ', encoding: ' + encoding + ', minetype: ' + mimetype
            );

            fileName = filename;
            mimeType = mimetype;

            file.on('data', (data: any) => {
                console.log(
                    'File [' + fieldname + '] got ' + data.length + ' bytes'
                );
                chunks.push(data);
            });

            file.on('end', () => {
                console.log('File [' + fieldname + '] Finished');
            });
        });

        busboy.on('field', function (
            fieldname: any,
            val: any,
        ) {
            console.log(
                'Field [' + fieldname + ']: value: ' + (val)
            );
        });

        busboy.on('finish', function () {
            console.log('Done parsing form!')
            const params = {
                Bucket: AWS_BUCKET_NAME,
                Key: uuidv4() + fileName,
                Body: Buffer.concat(chunks), // concatinating all chunks
                ACL: 'public-read',
                ContentType: mimeType,
            }
            s3.upload(params, function (err: any, data: any) {
                if (err) {
                    console.log(
                        'There was an error uploading your file: ',
                        err
                    );
                    throw (err);
                };
                console.log(
                    'Successfully uploaded file.',
                    data.Location
                );
                return routeResSuccess(res, data.Location);
            });
        });

        req.pipe(busboy);

    } catch (e) {
        console.log(e)
    };
};

export const s3Route = (app: Application) => {
    const router = Router();
    app.use("/s3", router);

    router.post("/upload", upload);
}
