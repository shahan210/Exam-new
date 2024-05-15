import express from "express";
import { verifyJwt, verifyJwtGet } from "../../Authentication/Authenticate.js";
import { authStudent } from "../../Client/Student/StudentAuth.js";
import { getExams } from "../../Client/Student/StudentExam.js";

const router = express.Router();

router.post("/auth", authStudent);
router.post("/exam", getExams);

export default router;
