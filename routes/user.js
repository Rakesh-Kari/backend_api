import express from "express";
import { User } from "../models/user.js";
import {
  getMyProfile,
  getAllUsers,
  register,
  login,
  logout,
} from "../controllers/user.js";
import { isAuthenicated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/all", getAllUsers);

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);

router.get("/me", isAuthenicated, getMyProfile);

export default router;
