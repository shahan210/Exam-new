import express from "express";
import {
  CreateClass,
  DeleteClass,
  editClass,
  getAllClass,
  updateClass,
} from "../../Client/Class/classMaster.js";
import { verifyJwt, verifyJwtGet } from "../../Authentication/Authenticate.js";

const router = express.Router();

router.get("/class", verifyJwtGet, getAllClass);
router.post("/class", verifyJwt, CreateClass);
router.get("/class/:id", verifyJwtGet, editClass);
router.put("/class/:id", verifyJwt, updateClass);
router.delete("/class", DeleteClass);

export default router;
