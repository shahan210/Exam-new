import express from "express";
import {
  CreateUser,
  getRights,
  getSpecificUser,
  getUsers,
  updateUser,
} from "../../Client/User/UserMaster.js";
import { authUser } from "../../Client/User/UserAuth.js";
const router = express.Router();

router.get("/user", getUsers);
router.get("/user/:id", getSpecificUser);
router.post("/user", CreateUser);
router.put("/user/:id", updateUser);
router.get("/rights", getRights);
router.post("/auth", authUser);

export default router;
