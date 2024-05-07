import express from "express";
import {
    createExamMaster,
    createdQuestionMaster,
    getExamMaster,
    getExamMasterInfo,
    getYearClassSubjectWiseList,
    newQuestionMaster,
} from "../../Client/exam/examMaster.js";

const router = express.Router();

router.get("/exam", getExamMaster);
router.post("/exam", getYearClassSubjectWiseList);
router.post("/examCreate", createExamMaster);
router.get("/examMaster/:id", getExamMasterInfo);
router.get("/createnewquestion/:id", newQuestionMaster);
router.post("/createdQuestionMaster", createdQuestionMaster);

export default router;
