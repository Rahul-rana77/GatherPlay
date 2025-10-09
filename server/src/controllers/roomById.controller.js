import Room from "../models/room.model.js";

export const getRoomById = async (req, res) => {
  try {
    const { roomId } = req.params;

    if (!roomId) {
      console.warn("⚠️ No roomId provided in request params.");
      return res.status(400).json({ error: "Room ID is required" });
    }

    console.log("🔍 Incoming request for roomId:", roomId);

    // Find the room and populate both participants and creator
    const room = await Room.findOne({ roomId })
      .populate("participants", "username email")
      .populate("createdBy", "username email");

    if (!room) {
      console.warn("⚠️ Room not found for roomId:", roomId);
      return res.status(404).json({ error: "Room not found" });
    }

    console.log("✅ Found room:", room.name);

    res.status(200).json({
      success: true,
      room: {
        roomId: room.roomId,
        name: room.name,
        description: room.description || "No description provided.",
        isPrivate: room.isPrivate,
        videoUrl: room.videoUrl || null,
        participants: room.participants?.map((p) => p.username) || [],
        createdBy: room.createdBy?.username || "Unknown",
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      },
    });
  } catch (error) {
    console.error("❌ Error fetching room:", error);
    res.status(500).json({ error: "Server error while fetching room" });
  }
};
