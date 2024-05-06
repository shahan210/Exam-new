import express from "express";
import {
  CreateSubject,
  DeleteSubject,
  UpdateSubject,
  editSubject,
  subjectGet,
} from "../../Client/Subject/subjectMaster.js";

const router = express.Router();

router.get("/subjects", subjectGet);
router.post("/subjects", CreateSubject);
router.get("/subjects/:id", editSubject);
router.put("/subjects/:id", UpdateSubject);
router.delete("/subjects", DeleteSubject);

export default router;
