import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Inventory from './model/TrainingModel.js';

dotenv.config();

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Inventory Data
const inventory = [
    {
        id: 1,
        name: 'Cardio Blast',
        title: 'A high-energy 20-minute cardio workout to improve endurance.',
        price: 0,
        category: 'Free',
        image: 'https://images.pexels.com/photos/3836831/pexels-photo-3836831.jpeg',
      },
      {
        id: 2,
        name: 'Full-Body Strength',
        title: 'A 30-minute strength training session targeting all major muscle groups.',
        price: 0,
        category: 'Free',
        image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
      },
      {
        id: 3,
        name: 'Core Sculpt',
        title: 'A 15-minute workout focused on building core strength.',
        price: 0,
        category: 'Free',
        image: 'https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg',
      },
      {
          "id": 4,
          "name": "Sunrise Yoga",
          "title": "A gentle 20-minute yoga flow to start your morning right.",
          "price": 0,
          "category": "Free",
          "image": "https://images.pexels.com/photos/5928258/pexels-photo-5928258.jpeg"
        },
        {
          "id": 5,
          "name": "Relax & Restore",
          "title": "A calming 25-minute yoga session for stress relief and relaxation.",
          "price": 0,
          "category": "Free",
          "image": "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg"
        },
        {
          "id": 6,
          "name": "Yoga for Flexibility",
          "title": "A 30-minute yoga practice to enhance flexibility and mobility.",
          "price": 9.99,
          "category": "Paid Yoga",
          "image": "https://images.pexels.com/photos/3822191/pexels-photo-3822191.jpeg"
        },
        {
            "id": 7,
            "name": "HIIT Pro",
            "title": "A 45-minute advanced High-Intensity Interval Training session to push your limits.",
            "price": 19.99,
            "category": "Paid Training",
            "image": "https://images.pexels.com/photos/6390240/pexels-photo-6390240.jpeg"
          },
          {
            "id": 8,
            "name": "Strength Mastery",
            "title": "A 60-minute guided strength training session for serious gains.",
            "price": 24.99,
            "category": "Paid Training",
            "image": "https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg"
          },
          {
            "id": 9,
            "name": "Power Yoga",
            "title": "A dynamic 40-minute yoga session for strength, balance, and focus.",
            "price": 14.99,
            "category": "Paid Yoga",
            "image": "https://images.pexels.com/photos/13849090/pexels-photo-13849090.jpeg"
          },
          {
            "id": 10,
            "name": "Yoga Masterclass",
            "title": "A 90-minute in-depth yoga workshop to enhance your practice.",
            "price": 39.99,
            "category": "Paid Yoga",
            "image": "https://images.pexels.com/photos/8436707/pexels-photo-8436707.jpeg"
          }
];

const addInventory = async () => {
    try {
        await Inventory.deleteMany(); // Clear existing data
        for (const item of inventory) {
            try {
                const newItem = new Inventory(item);
                await newItem.save();
                console.log(`Added ${item.name} to the database.`);
            } catch (err) {
                console.error(`Failed to add ${item.name}: ${err.message}`);
            }
        }
        console.log("All inventory items have been added successfully.");
    } catch (err) {
        console.error("Error adding inventory:", err.message);
    }
};

(async () => {
    await addInventory();
    mongoose.disconnect();
})();
