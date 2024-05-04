import express from "express";
import {
  CreateClass,
  editClass,
  getAllClass,
  updateClass,
} from "../../Client/Class/classMaster.js";

const router = express.Router();

router.get("/class", getAllClass);
router.post("/class", CreateClass);
router.get("/class/:id", editClass);
router.put("/class/:id", updateClass);

export default router;
