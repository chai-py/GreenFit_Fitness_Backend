import express from 'express';
import { getTraining } from '../controller/TrainingController.js';

const router = express.Router();

router.get("/", getTraining);

export default router;