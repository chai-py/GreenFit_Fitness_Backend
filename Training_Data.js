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
// const inventory = [
//     {
//         id: 1,
//         name: 'Cardio Blast',
//         title: 'A high-energy 20-minute cardio workout to improve endurance.',
//         price: 0,
//         category: 'Free',
//         image: 'https://images.pexels.com/photos/3836831/pexels-photo-3836831.jpeg',
//       },
//       {
//         id: 2,
//         name: 'Full-Body Strength',
//         title: 'A 30-minute strength training session targeting all major muscle groups.',
//         price: 0,
//         category: 'Free',
//         image: 'https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg',
//       },
//       {
//         id: 3,
//         name: 'Core Sculpt',
//         title: 'A 15-minute workout focused on building core strength.',
//         price: 0,
//         category: 'Free',
//         image: 'https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg',
//       },
//       {
//           "id": 4,
//           "name": "Sunrise Yoga",
//           "title": "A gentle 20-minute yoga flow to start your morning right.",
//           "price": 0,
//           "category": "Free",
//           "image": "https://images.pexels.com/photos/5928258/pexels-photo-5928258.jpeg"
//         },
//         {
//           "id": 5,
//           "name": "Relax & Restore",
//           "title": "A calming 25-minute yoga session for stress relief and relaxation.",
//           "price": 0,
//           "category": "Free",
//           "image": "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg"
//         },
//         {
//           "id": 6,
//           "name": "Yoga for Flexibility",
//           "title": "A 30-minute yoga practice to enhance flexibility and mobility.",
//           "price": 9.99,
//           "category": "Paid Yoga",
//           "image": "https://images.pexels.com/photos/3822191/pexels-photo-3822191.jpeg"
//         },
//         {
//             "id": 7,
//             "name": "HIIT Pro",
//             "title": "A 45-minute advanced High-Intensity Interval Training session to push your limits.",
//             "price": 19.99,
//             "category": "Paid Training",
//             "image": "https://images.pexels.com/photos/6390240/pexels-photo-6390240.jpeg"
//           },
//           {
//             "id": 8,
//             "name": "Strength Mastery",
//             "title": "A 60-minute guided strength training session for serious gains.",
//             "price": 24.99,
//             "category": "Paid Training",
//             "image": "https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg"
//           },
//           {
//             "id": 9,
//             "name": "Power Yoga",
//             "title": "A dynamic 40-minute yoga session for strength, balance, and focus.",
//             "price": 14.99,
//             "category": "Paid Yoga",
//             "image": "https://images.pexels.com/photos/13849090/pexels-photo-13849090.jpeg"
//           },
//           {
//             "id": 10,
//             "name": "Yoga Masterclass",
//             "title": "A 90-minute in-depth yoga workshop to enhance your practice.",
//             "price": 39.99,
//             "category": "Paid Yoga",
//             "image": "https://images.pexels.com/photos/8436707/pexels-photo-8436707.jpeg"
//           }
// ];

const inventory = [
  {
    "id": 1,
    "name": "Cardio Blast",
    "title": "A high-energy cardio workout to improve endurance.",
    "price": 0,
    "category": "Free",
    "image": "https://images.pexels.com/photos/3836831/pexels-photo-3836831.jpeg",
    "batchStartTime": "2024-12-18T06:00:00Z",
    "batchEndTime": "2024-12-18T06:20:00Z",
    "weeklyClasses": {
      "frequency": "one time demo class",
      "days": ["Monday", "Wednesday", "Friday"],
      "classDuration": "30 minutes"
    },
    "benefits": {
      "balance": "Improves cardiovascular endurance and stamina.",
      "strength": "Increases overall body strength and energy levels.",
      "focus": "Helps in burning fat and improving metabolism."
    }
  },
  {
    "id": 2,
    "name": "Full-Body Strength",
    "title": "A strength training session targeting all major muscle groups.",
    "price": 0,
    "category": "Free",
    "image": "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg",
    "batchStartTime": "2024-12-20T07:00:00Z",
    "batchEndTime": "2024-12-20T07:30:00Z",
    "weeklyClasses": {
      "frequency": "one time demo class",
      "days": ["Tuesday", "Thursday"],
      "classDuration": "30 minutes"
    },
    "benefits": {
      "focus": "Focuses on building muscle mass and strength.",
      "balance": "Enhances muscular endurance and stamina.",
      "strength": "Helps in toning and defining the entire body."
    }
  },
  {
    "id": 3,
    "name": "Core Sculpt",
    "title": "A workout designed to strengthen and tone your core muscles.",
    "price": 0,
    "category": "Free",
    "image": "https://images.pexels.com/photos/209969/pexels-photo-209969.jpeg",
    "batchStartTime": "2024-12-20T08:00:00Z",
    "batchEndTime": "2024-12-20T08:15:00Z",
    "weeklyClasses": {
      "frequency": "one time demo class",
      "days": ["Monday", "Wednesday", "Friday"],
      "classDuration": "30 minutes"
    },
    "benefits": {
      "strength": "Strengthens and tones the abdominal muscles.",
      "focus": "Improves posture and spinal alignment.",
      "balance": "Enhances balance and stability through core exercises."
    }
  },
  {
    "id": 4,
    "name": "Sunrise Yoga",
    "title": "A gentle yoga flow to start your morning right.",
    "price": 0,
    "category": "Free",
    "image": "https://images.pexels.com/photos/5928258/pexels-photo-5928258.jpeg",
    "batchStartTime": "2024-12-25T06:00:00Z",
    "batchEndTime": "2024-12-25T06:20:00Z",
    "weeklyClasses": {
      "frequency": "one time demo class",
      "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "classDuration": "30 minutes"
    },
    "benefits": {
      "strength": "Increases flexibility and mobility in the body.",
      "balance": "Helps to reduce stress and enhance relaxation.",
      "focus": "Promotes mindfulness and a calm mind to start the day."
    }
  },
  {
    "id": 5,
    "name": "Relax & Restore",
    "title": "A calming yoga session for stress relief and relaxation.",
    "price": 0,
    "category": "Free",
    "image": "https://images.pexels.com/photos/3822864/pexels-photo-3822864.jpeg",
    "batchStartTime": "2024-12-23T07:30:00Z",
    "batchEndTime": "2024-12-23T08:00:00Z",
    "weeklyClasses": {
      "frequency": "one time demo class",
      "days": ["Tuesday", "Thursday", "Saturday"],
      "classDuration": "30 minutes"
    },
    "benefits": {
      "strength": "Effective for reducing stress and anxiety.",
      "balance": "Promotes deep relaxation and mental clarity.",
      "focus": "Helps restore energy and balance to the body."
    }
  },
  {
    "id": 6,
    "name": "Yoga for Flexibility",
    "title": "A yoga practice to enhance flexibility and mobility.",
    "price": 9.99,
    "category": "Paid Yoga",
    "image": "https://images.pexels.com/photos/3822191/pexels-photo-3822191.jpeg",
    "batchStartTime": "2024-12-20T06:00:00Z",
    "batchEndTime": "2024-12-27T06:30:00Z",
    "weeklyClasses": {
      "frequency": "2 times a week",
      "days": ["Monday", "Thursday"],
      "classDuration": "45 minutes"
    },
    "benefits": {
      "strength": "Helps increase range of motion and flexibility.",
      "balance": "Enhances joint mobility and overall body movement.",
      "focus": "Improves posture by stretching and strengthening the muscles."
    }
  },
  {
    "id": 7,
    "name": "HIIT Pro",
    "title": "An advanced High-Intensity Interval Training session to push your limits.",
    "price": 19.99,
    "category": "Paid Training",
    "image": "https://images.pexels.com/photos/6390240/pexels-photo-6390240.jpeg",
    "batchStartTime": "2024-12-18T07:00:00Z",
    "batchEndTime": "2024-12-25T07:45:00Z",
    "weeklyClasses": {
      "frequency": "3 times a week",
      "days": ["Monday", "Wednesday", "Friday"],
      "classDuration": "45 minutes"
    },
    "benefits": {
      "strength": "Boosts muscular strength and endurance.",
      "balance": "Effective for fat loss and muscle toning.",
      "focus": "Improves cardiovascular health and stamina."
    }
  },
  {
    "id": 8,
    "name": "Strength Mastery",
    "title": "A guided strength training session for serious gains.",
    "price": 24.99,
    "category": "Paid Training",
    "image": "https://images.pexels.com/photos/3757376/pexels-photo-3757376.jpeg",
    "batchStartTime": "2024-12-20T06:00:00Z",
    "batchEndTime": "2024-12-27T07:00:00Z",
    "weeklyClasses": {
      "frequency": "2 times a week",
      "days": ["Tuesday", "Thursday"],
      "classDuration": "60 minutes"
    },
    "benefits": {
      "strength": "Focused on building strength and muscle mass.",
      "balance": "Increases lean muscle tissue for a toned body.",
      "focus": "Improves muscular endurance and overall fitness."
    }
  },
  {
    "id": 9,
    "name": "Power Yoga",
    "title": "A dynamic yoga session for strength, balance, and focus.",
    "price": 14.99,
    "category": "Paid Yoga",
    "image": "https://images.pexels.com/photos/13849090/pexels-photo-13849090.jpeg",
    "batchStartTime": "2024-12-21T06:00:00Z",
    "batchEndTime": "2024-12-28T06:40:00Z",
    "weeklyClasses": {
      "frequency": "3 times a week",
      "days": ["Monday", "Wednesday", "Friday"],
      "classDuration": "45 minutes"
    },
    "benefits": {
      "strength": "Yoga poses target multiple muscle groups, improving strength.",
      "balance": "Improves body stability through core strengthening and balance exercises.",
      "focus": "Mindful breathing and poses help improve mental clarity and focus."
    }
  },
  {
    "id": 10,
    "name": "Yoga Masterclass",
    "title": "An in-depth yoga workshop to enhance your practice.",
    "price": 39.99,
    "category": "Paid Yoga",
    "image": "https://images.pexels.com/photos/8436707/pexels-photo-8436707.jpeg",
    "batchStartTime": "2024-12-19T08:00:00Z",
    "batchEndTime": "2024-12-26T09:30:00Z",
    "weeklyClasses": {
      "frequency": "3 time a week",
      "days": ["Friday", "Saturday", "Sunday"],
      "classDuration": "90 minutes"
    },
    "benefits": {
      "strength": "Provides in-depth knowledge and techniques from expert instructors.",
      "balance": "Deepens the mind-body connection and enhances the practice.",
      "focus": "Helps in personal yoga growth and mastery of challenging poses."
    }
  },
  {
    "id": 11,
    "name": "Power Core Circuit",
    "title": "An intensive workout designed to target your core muscles while enhancing overall strength",
    "price": 49.99,
    "category": "Paid Training",
    "image": "https://images.pexels.com/photos/20817818/pexels-photo-20817818.jpeg",
    "batchStartTime": "2024-12-25T18:00:00Z",
    "batchEndTime": "2024-12-25T18:20:00Z",
    "weeklyClasses": {
      "frequency": "one time demo class",
      "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "classDuration": "30 minutes"
    },
    "benefits": {
      "strength": "Improves posture and strengthens the back and core muscles.",
      "balance": "Enhances body awareness and stability through gentle movements.",
      "focus": "Encourages mental clarity and prepares the mind for restful sleep."
    }
  }
]

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
