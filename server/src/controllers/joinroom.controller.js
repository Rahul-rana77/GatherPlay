import bcrypt from "bcrypt";
import Room from "../models/room.model.js";
import User from "../models/user.model.js";

const joinRoom = async (req, res) => {
  try {
    const { roomLink,username, roomPassword } = req.body;

    if (!roomLink || !username) {
      return res.status(400).json({ error: "Room link and username are required" });
    }

    const parts = roomLink.split("/");
    const roomId = parts[parts.length - 1];

    const room = await Room.findOne({ roomId });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    
    if (room.isPrivate) {
            const isMatch = await bcrypt.compare(roomPassword, room.roomPassword);
        if (!isMatch) {
             return res.status(403).json({ error: "Invalid room password" });
  }
}
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const alreadyInRoom = room.participants.some(
      (p) => p.username === username
    );

    if (!alreadyInRoom) {
      room.participants.push({ username });
      await room.save();
    }

    return res.status(200).json({
      message: "Joined room successfully",
      roomId: room.roomId,
      room,
    });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export { joinRoom };