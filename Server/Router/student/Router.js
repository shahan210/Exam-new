import express from "express";
import {
  verifyJwtExam,
  verifyJwtExamGet,
} from "../../Authentication/Authenticate.js";
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
router.post("/exam", verifyJwtExam, getExams);
router.get("/question/:id", verifyJwtExamGet, getQuestions);
router.post("/upcoming", verifyJwtExam, upcomingExams);
router.post("/student/exam", verifyJwtExam, getStudentExam);
router.post("/student/exam/complete", verifyJwtExam, completeExam);
router.post("/student/check", verifyJwtExam, checkExam);
router.post("/question/all", verifyJwtExam, addQuestions);
router.post("/question/one", UpdateQuestion);
router.post("/question/retrieve", verifyJwtExam, retreiveExam);
router.post("/question/results", verifyJwtExam, results);

export default router;
