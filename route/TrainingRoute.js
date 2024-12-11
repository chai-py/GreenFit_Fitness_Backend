import express from 'express';
import { getTraining } from '../controller/TrainingController.js';
// import { protectToken } from "../middleware/AuthToken.js";

const router = express.Router();

// Route to get all training courses
router.get("/", getTraining);

// Route to get a single training course by its ID
router.get("/:id", getTraining);  // This is your dynamic route for fetching by ID

export default router;