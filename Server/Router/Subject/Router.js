import express from "express";
import {
  CreateSubject,
  DeleteSubject,
  UpdateSubject,
  editSubject,
  subjectGet,
} from "../../Client/Subject/subjectMaster.js";
import { verifyJwt, verifyJwtGet } from "../../Authentication/Authenticate.js";

const router = express.Router();

router.get("/subjects", verifyJwtGet, subjectGet);
router.post("/subjects", verifyJwt, CreateSubject);
router.get("/subjects/:id", verifyJwtGet, editSubject);
router.put("/subjects/:id", verifyJwt, UpdateSubject);
router.delete("/subjects", DeleteSubject);

export default router;
