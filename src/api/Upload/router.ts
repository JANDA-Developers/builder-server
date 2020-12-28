import { s3Upload } from "../../utils/s3";
import formidable from "formidable";
import express from "express";
import fs from "fs";

var router = express();

router.post("/upload", async (req, res) => {
    var form = new formidable.IncomingForm({});
    form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
            console.log(err);
            console.log(fields);
            return;
        }
        const result = await s3Upload(
            files.upload.name,
            fs.createReadStream(files.upload.path)
        );
        console.log(result);
        res.send({ url: result.Location });
    });
});

// interface UploadRequest {
//     files : any
// }

// router.WebPage<UploadRequest>('/upload_ckEditor',  async (req : any, res : express.Response) =>{
//     console.log("upload call!!!!");
//     console.log(req);
//     console.log(req.files);
//     console.log(req.params);
//     console.log(req.body);
//     console.log(req.form);
//     console.log(req.upload);
//     const files  = req.files.upload;
//     try {
//         if(!files) {
//             res.send({
//                 status: false,
//                 message: 'No file uploaded'
//             });
//         } else {
//             console.log("files");
//             console.log(files);
//             //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
//             let image = files;
//             const fileContent  = Buffer.from(image.data, 'binary');
//             console.log("s3 upload start!")
//             let result =  await s3Upload(image.name, fileContent);
//             console.log("s3 upload complete!")
//             console.log(result);
//             //Use the mv() method to place the file in upload directory (i.e. "uploads")
//             //image.mv('./uploads/' + image.name);
//             res.send( {
//                 url : result.Location,

//             });
//         }
//     }catch(err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// });

export default router;
