import Room from "../models/room.model.js";
import { v4 as uuidv4 } from "uuid"; 
import bcrypt from "bcrypt";

const createRoom = async (req, res) => {
  try {
    const { name, description, isPrivate, roomPassword } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Room name is required" });
    }

    // Generate unique roomId
    const roomId = uuidv4();

    let hashedPassword = null;
    if (isPrivate && roomPassword) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(roomPassword, salt);
    }

    const room = await Room.create({
      roomId,
      name,
      description,
      isPrivate,
      roomPassword: hashedPassword,
      createdBy: req.user?._id || null, // attach logged-in user if available
      participants: req.user ? [req.user._id] : [],
    });

    return res.status(201).json({
      message: "Room created successfully",
      roomLink: `${process.env.FRONTEND_URL}/join/${roomId}`,
      room,
    });
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export { createRoom };
