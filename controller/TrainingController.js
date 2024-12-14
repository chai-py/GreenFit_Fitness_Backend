import Training from "../model/TrainingModel.js";
import mongoose from "mongoose";
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export const getTraining = async (req, res) => {
    const { id } = req.params; // Get the ID from the URL parameters

    try {
        if (id) {
            // Check if the ID is a valid MongoDB ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ message: 'Invalid ID format' });
            }

            // Fetch a specific training course by ID
            const training = await Training.findById(id);

            if (!training) {
                return res.status(404).json({ message: 'Training course not found' });
            }

            return res.status(200).json(training);
        }

        // If no ID is provided, fetch all training courses
        const training = await Training.find();
        res.status(200).json(training);

    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Internal server error", error });
    }
};

export const createTraining = async (req, res) => {
    try {
      const newTraining = new Training(req.body);
      const savedTraining = await newTraining.save();
      res.status(201).json(savedTraining);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const updateTraining = async (req, res) => {
    try {
      const updatedTraining = await Training.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedTraining) {
        return res.status(404).json({ error: 'Training not found' });
      }
      res.json(updatedTraining);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  
  export const deleteTraining = async (req, res) => {
    try {
      const deletedTraining = await Training.findByIdAndDelete(req.params.id);
      if (!deletedTraining) {
        return res.status(404).json({ error: 'Training not found' });
      }
      res.json({ message: 'Training deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };