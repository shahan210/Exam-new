import express from "express";
import { getExamMaster, getYearClassSubjectWiseList } from "../../Client/exam/examMaster.js";

const router = express.Router();

router.get("/exam", getExamMaster);
router.post("/exam", getYearClassSubjectWiseList);


export default router;
