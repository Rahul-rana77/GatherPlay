import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


const registerUser = async (req, res) => {
    try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already registered" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
     try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateProfile = async (req, res) => {
    try{
      const {avatar} = req.body;
      const userID = req.user._id;
      if (!avatar) {
        return res.status(400).json({ error: "Avatar is required" });
      }
      const uploadedAvatar = await cloudinary.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale"
      });
      const updatedUser = await User.findByIdAndUpdate(
        userID, 
        { avatar: uploadedAvatar.secure_url }, 
        { new: true }
      );
      res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
    }
    catch(error){
      console.log("Error in updateProfile controller:", error.message);
      res.status(500).json({ "Internal server error": error.message });
    }
};

export { registerUser, loginUser, updateProfile };
  