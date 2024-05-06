import express from "express";
import { getExamMaster } from "../../Client/exam/examMaster.js";

const router = express.Router();

router.get("/exam", getExamMaster);


export default router;
