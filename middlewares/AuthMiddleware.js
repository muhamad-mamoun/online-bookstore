import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) 
    return res.status(401).json({ message: "Not authorized, token missing" });
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};
