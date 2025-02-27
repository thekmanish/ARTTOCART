import express from "express";
import {
  signUpController,
  loginController,
} from "../controller/authController.js";

const router = express.Router();
router.post("/signup", signUpController);

router.get("/login", loginController);
export default router;
