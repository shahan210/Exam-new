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

export default router;
