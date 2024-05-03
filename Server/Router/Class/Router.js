import express from "express";
import { getAllClass } from "../../Client/Class/classMaster.js";

const router = express.Router();

router.get("/class", getAllClass);

export default router