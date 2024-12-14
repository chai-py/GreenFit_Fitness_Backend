// import jwt from "jsonwebtoken";
// import User from "../model/UserModel.js";

// export const protectToken = async (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({ message: "Access denied, token missing" });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;

//     // Fetch the user from the database to check the role
//     const user = await User.findById(decoded.id);
//     if (!user) {
//       return res.status(401).json({ message: "Invalid token" });
//     }

//     if (user.role !== 'admin') {
//       return res.status(403).json({ message: 'Forbidden: Admin access required' });
//     }

//     next();

//   } catch (error) {
//     res.status(403).json({ message: "Invalid or expired token" });
//   }
// };

import jwt from "jsonwebtoken";
import User from "../model/UserModel.js";

export const protectToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: "Access denied, token missing" });
  }

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user info from the decoded token to the request object
    req.user = decoded;

    // Fetch the user from the database to check the role
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Check if the user has the 'admin' role
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden: Admin access required' });
    }

    // If everything is fine, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Specific handling for token errors
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token has expired" });
    }
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
