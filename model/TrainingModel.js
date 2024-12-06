import mongoose from "mongoose";

const trainingSchema=mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    image: String,
    title: String,
}, { timestamps: true });

const Training = mongoose.model("Training", trainingSchema)

export default Training;