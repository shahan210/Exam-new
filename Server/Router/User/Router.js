import express from "express";
import {
  CreateUser,
  createUserSubjects,
  getRights,
  getSpecificUser,
  getUsers,
  getUsersSubject,
  updateUser,
  updateUserSubjects,
} from "../../Client/User/UserMaster.js";
import { authUser } from "../../Client/User/UserAuth.js";
const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getSpecificUser);
router.post("/user", CreateUser);
router.put("/user/:id", updateUser);
router.get("/rights", getRights);
router.post("/auth", authUser);
router.post("/usersubject", createUserSubjects);
router.put("/usersubject", updateUserSubjects);
router.get("/usersubject/:id", getUsersSubject);

export default router;
