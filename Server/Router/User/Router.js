import express from "express";
import { getRights, getUsers } from "../../Client/User/UserMaster.js";
const router = express.Router();

router.get("/user", getUsers);
router.get("/rights", getRights);

export default router;
