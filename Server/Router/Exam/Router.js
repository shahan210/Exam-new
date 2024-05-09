import express from "express";
import {
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
import multer from "multer";
import { fileFilter, storage } from "../../middleware/multer.js";
import { uploadImage } from "../../Client/exam/ImageUploader.js";

const upload = multer({ fileFilter: fileFilter, storage });

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
router.post("/uploadQuestionImages", upload.array("images"), async (req, res) => {
    const fileData = req.files.map(async (file) => {
        // console.log(req.body, "body,", file.filename);
        const response = await uploadImage({ body: req.body, file: file });
        console.log(response);

        return {
            fileName: file.filename,
            filePath: file.path,
        };
    });

    res.status(200).json({ msg: "fun" });
});

export default router;
