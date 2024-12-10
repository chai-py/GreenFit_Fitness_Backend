import mongoose from "mongoose";

const trainingSchema = mongoose.Schema({
    name: { type: String },
    price: { type: Number },
    category: { type: String },
    image: { type: String },
    title: { type: String },
    batchStartTime: { type: Date },
    batchEndTime: { type: Date },
    weeklyClasses: {
        frequency: { type: String },
        days: { type: [String] },
        classDuration: { type: String }
    },
    benefits: {
        strength: { type: String },
        balance: { type: String },
        focus: { type: String }
    }
}, { timestamps: true });

const Training = mongoose.model("Training", trainingSchema);

export default Training;