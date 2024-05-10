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
import { verifyJwt, verifyJwtGet } from "../../Authentication/Authenticate.js";
const router = express.Router();

router.get("/user", verifyJwtGet, getUsers);
router.get("/user/:id", verifyJwtGet, getSpecificUser);
router.post("/user", verifyJwt, CreateUser);
router.put("/user/:id", verifyJwt, updateUser);
router.get("/rights", verifyJwtGet, getRights);
router.post("/auth", authUser);
router.post("/usersubject", verifyJwt, createUserSubjects);
router.put("/usersubject", verifyJwt, updateUserSubjects);
router.get("/usersubject/:id", verifyJwtGet, getUsersSubject);

export default router;
