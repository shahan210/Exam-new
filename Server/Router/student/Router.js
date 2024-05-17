import express from "express";
import { verifyJwt, verifyJwtGet } from "../../Authentication/Authenticate.js";
import { authStudent } from "../../Client/Student/StudentAuth.js";
import {
  checkExam,
  completeExam,
  getExams,
  getQuestions,
  getStudentExam,
  upcomingExams,
} from "../../Client/Student/StudentExam.js";
import {
  UpdateQuestion,
  addQuestions,
  results,
  retreiveExam,
} from "../../Client/Student/StudentQuestions.js";


const router = express.Router();

router.post("/auth", authStudent);
router.post("/exam", getExams);
router.get("/question/:id", getQuestions);
router.post("/upcoming", upcomingExams);
router.post("/student/exam", getStudentExam);
router.post("/student/exam/complete", completeExam);
router.post("/student/check", checkExam);
router.post("/question/all", addQuestions);
router.post("/question/one", UpdateQuestion);
router.post("/question/retrieve", retreiveExam);
router.post("/question/results", results);

export default router;
