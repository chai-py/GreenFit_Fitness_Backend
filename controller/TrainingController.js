// import Training from "../model/TrainingModel.js"
// export const getTraining = async(req, res) => {
//     try {
//         const training = await Training.find();
//         res.status(200).json(training);
//     } catch (error) {
//         console.log("Error: ", error);
//         res.status(500).json(error);
//     }
// };

import Training from "../model/TrainingModel.js";
import mongoose from "mongoose";

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