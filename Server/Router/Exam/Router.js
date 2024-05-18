import express from "express";
import fs from "fs";
import multer from "multer";
import {
  UpdateExamMark,
  UploadFileData,
  UploadImages,
  createExamMaster,
  createdQuestionMaster,
  editExamMasterInfo,
  getExamMaster,
  getExamMasterEditInfo,
  getExamMasterInfo,
  getQuizMasterEditInfo,
  getYearClassSubjectWiseList,
  newQuestionMaster,
  updateQuizMasterEditInfo,
} from "../../Client/exam/examMaster.js";
import { fileFilter, storage } from "../../middleware/multer.js";

const filestorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const paths = `./uploads`;
    fs.mkdirSync(paths, { recursive: true });
    return cb(null, paths);
  },

  filename: function (req, file, cb) {
    const fileExtension = file.originalname;
    const dynamicFilename = "file" + fileExtension;
    cb(null, dynamicFilename);
  },
});

const upload = multer({ fileFilter: fileFilter, storage });
const fileUpload = multer({ storage: filestorage });

const router = express.Router();

router.get("/exam", getExamMaster);
router.post("/exam", getYearClassSubjectWiseList);
router.post("/examCreate", createExamMaster);
router.get("/examMaster/:id", getExamMasterInfo);
router.get("/examMasteredit/:id", getExamMasterEditInfo);
router.put("/examMasteredit", editExamMasterInfo);
router.get("/quesMasteredit/:id", getQuizMasterEditInfo);
router.put("/quesMasteredit", updateQuizMasterEditInfo);
router.get("/createnewquestion/:id", newQuestionMaster);
router.post("/createdQuestionMaster", createdQuestionMaster);
router.post("/uploadQuestionImages", upload.array("images"), UploadImages);
router.post("/uploadQuestionfile", fileUpload.single("files"), UploadFileData);
router.post("/UploadMark", UpdateExamMark);

export default router;
