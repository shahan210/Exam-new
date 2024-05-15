import multer from "multer";
import fs from "fs";

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `./uploads`;
        fs.mkdirSync(path, { recursive: true });
        return cb(null, path);
    },
    
    filename: function (req, file, cb) {
        const id = req.uploadId;
        const fileName = req.uploadFileName;
        const fileExtension = file.originalname.split(".").pop();
        const dynamicFilename = id + "-" + fileName + "." + fileExtension;
        cb(null, dynamicFilename);
    },
});

export const fileFilter = function (req, file, cb) {
    req.uploadId = req.body.id;
    req.uploadFileName = req.body.fileName;

    cb(null, true);
};
