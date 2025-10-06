import Room from "../models/room.model.js";

// 🆕 Get Room by ID
export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;

    // Find room by roomId
    const room = await Room.findOne({ roomId }).populate("participants", "username email");

    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }

    // Structure clean response
    res.status(200).json({
      success: true,
      room: {
        roomId: room.roomId,
        name: room.name,
        description: room.description,
        isPrivate: room.isPrivate,
        videoUrl: room.videoUrl,
        participants: room.participants.map((p) => p.username),
        createdBy: room.createdBy?.username || "Unknown",
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Server error while fetching room" });
  }
};
