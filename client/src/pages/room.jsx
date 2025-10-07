import { useState } from 'react';
import React, { useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom";

const Room = () => {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.roomId;
  const [room , setRoom] = useState("");
  const getDetails = async () => {
  try {
    const response = await fetch(`https://gatherplay.onrender.com/api/v1/room/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        });
    const data = await response.json();
    if (response.ok && data.success) {
        setRoom(data.room);
    } else {
        console.error("Failed to fetch room details:", data.error);
    }
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error;
  }
};

  useEffect(() => {
    getDetails().then(() => {
      console.log("Room details fetched successfully");
    }).catch((error) => {
      console.error("Error in getDetails:", error);
    });
  }, [getDetails]);
  return (

    <div>
      <h1>Room Page</h1>
      <p>This is where the room functionality will be implemented.</p>
        <div >
          <h1 >
            Room Name: {room?.name || "Loading..."}
          </h1>
          <p >RoomID:{params.roomId}</p>
          <p >{room?.description || "No description provided"}</p>

          <div >
            <p>
              Welcome, <span></span> 👋
            </p>
          </div>

          <div className="border-t border-gray-300 dark:border-gray-600 pt-4">
          <h3 className="text-lg font-semibold mb-2">👥 Participants</h3>
          {room.participants && room.participants.length > 0 ? (
            <ul className="list-disc ml-6">
              {room.participants.map((user, i) => (
                <li key={i}>{user}</li>
              ))}
            </ul>
          ) : (
            <p>No participants yet.</p>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Back to Home
          </button>
        </div>
      {/* Video Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">🎬 Video Section</h2>
        {room.videoUrl ? (
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={room.videoUrl}
              title="Room Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        ) : (
          <p>No video URL provided.</p>
        )}
      </div>
        </div>
    </div>
  )
}

export default Room