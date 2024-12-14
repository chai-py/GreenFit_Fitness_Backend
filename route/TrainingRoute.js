import express from 'express';
import { getTraining, createTraining, updateTraining, deleteTraining } from '../controller/TrainingController.js';
import { protectToken } from "../middleware/AuthToken.js";

const router = express.Router();

// Route to get all training courses
router.get("/", getTraining);

// Route to get a single training course by its ID
router.get("/:id", getTraining);  

// Route to create a new training course
router.post("/",protectToken, createTraining);

// Route to update a training course by its ID
router.put("/:id",protectToken, updateTraining);

// Route to delete a training course by its ID
router.delete("/:id",protectToken, deleteTraining);

export default router;