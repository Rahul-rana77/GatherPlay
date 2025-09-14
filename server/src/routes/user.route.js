import express from "express";
import { registerUser, loginUser, updateProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";


const router = express.Router();


router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/profile").put(protectRoute,updateProfile);

export default router;
