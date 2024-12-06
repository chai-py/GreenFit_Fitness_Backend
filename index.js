import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import TrainingRoute from "./route/TrainingRoute.js"
import UserRoute from "./route/UserRoute.js"
import cors from "cors";


const app = express();

app.use(cors());

dotenv.config();
app.use(express.json());

const PORT=process.env.PORT || 4001;

//Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 30000 })
  .then(() => console.log("MongoDB connection successful"))
  .catch((error) => console.error("MongoDB connection error:", error));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/training", TrainingRoute)
app.use("/user", UserRoute)

app.listen(PORT, () => {
  console.log(`Server is listining on port ${PORT}`)
})