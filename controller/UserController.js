import User from "../model/UserModel.js";
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

// User Signup Function
export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashPassword = await bcryptjs.hash(password, 10);

        // Create a new user with the hashed password
        const createdUser = new User({
            username,
            email,
            password: hashPassword, // Use hashed password
        });

        // Save the user to the database
        await createdUser.save();

        // Generate JWT token for the new user                    // JWTtoken not needed for signup
        const token = jwt.sign(
            { id: createdUser._id, email: createdUser.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(201).json({
            message: "User created successfully",
            token, // Send the JWT token in response    //I think I dont need JWT token for signup
            user: {
                _id: createdUser._id,
                username: createdUser.username,
                email: createdUser.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

// User Login Function
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare the entered password with the hashed password
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token for the authenticated user
        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );

        res.status(200).json({
            message: "Login successful",
            token, // Send the JWT token in response
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
            },
        });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
// Get Profile Function
export const getProfile = async (req, res) => {
    try {
        // Assuming you have a User model and the user info is stored in req.user after token verification
        const user = await User.findById(req.user._id); // Access the user data from the token
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ profile: user });
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Server error" });
    }
};