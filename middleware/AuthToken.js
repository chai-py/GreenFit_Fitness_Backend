import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const protectToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    // Fetch the user from the database to check the role
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    next();

  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
