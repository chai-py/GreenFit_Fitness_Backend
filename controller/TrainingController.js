import Training from "../model/TrainingModel.js"
export const getTraining = async(req, res) => {
    try {
        const training = await Training.find();
        res.status(200).json(training);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};