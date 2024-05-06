import express from "express";
import { getUsers } from "../../Client/User/UserMaster.js";
const router = express.Router();

router.get("/user", getUsers);

export default router;
