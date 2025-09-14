import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
    try {
    const token = req.cokkie.jwt;
    if (!token){
        res.status(401).json({ error: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
        res.status(401).json({ error: "Unauthorised - Invalid token" });
    }
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
        res.status(401).json({ error: "User not found" });
    }
    next();
  }
    catch (error) {
        console.log("Error in protectRoute middleware:", error.message);
        res.status(401).json({ error: "Internal server error" });
  }

}

export { protectRoute };