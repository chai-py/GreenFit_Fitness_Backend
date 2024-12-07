import express from "express";
import { login, signup, getProfile } from "../controller/UserController.js"
const router=express.Router()
import { protectToken } from "../middleware/AuthToken.js";


router.post("/signup",signup)
router.post("/login",login)

// Protected route
router.get("/profile", getProfile);


export default router