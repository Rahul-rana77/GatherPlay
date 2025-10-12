import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import ReactPlayer from "react-player";

const socket = io("https://gatherplay.onrender.com"); // your backend socket server

const Room = () => {
  const { roomId } = useParams();
  const [videoUrl, setVideoUrl] = useState("");
  const [currentUrl, setCurrentUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    socket.emit("join_room", roomId);

    socket.on("video_update", ({ videoUrl }) => {
      setCurrentUrl(videoUrl);
    });

    socket.on("video_control", ({ action, time }) => {
      if (!playerRef.current) return;
      const player = playerRef.current;

      if (action === "play") player.seekTo(time, "seconds"), setIsPlaying(true);
      if (action === "pause") player.seekTo(time, "seconds"), setIsPlaying(false);
    });

    return () => {
      socket.off("video_update");
      socket.off("video_control");
    };
  }, [roomId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (videoUrl.trim()) {
      setCurrentUrl(videoUrl);
      socket.emit("video_update", { roomId, videoUrl });
      setVideoUrl("");
    }
  };

  const handlePlay = () => {
    socket.emit("video_control", {
      roomId,
      action: "play",
      time: playerRef.current.getCurrentTime(),
    });
    setIsPlaying(true);
  };

  const handlePause = () => {
    socket.emit("video_control", {
      roomId,
      action: "pause",
      time: playerRef.current.getCurrentTime(),
    });
    setIsPlaying(false);
  };

  return (
    <div className="room-container" style={{ padding: "20px", textAlign: "center" }}>
      <h1>🎥 Room ID: {roomId}</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Enter video URL (YouTube, Vimeo, etc.)"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          style={{
            padding: "10px",
            width: "60%",
            border: "1px solid #aaa",
            borderRadius: "6px",
          }}
        />
        <button
          type="submit"
          style={{
            marginLeft: "10px",
            padding: "10px 16px",
            border: "none",
            borderRadius: "6px",
            background: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Load
        </button>
      </form>

      {currentUrl && (
        <div>
          <ReactPlayer
            ref={playerRef}
            url={currentUrl}
            controls
            playing={isPlaying}
            width="80%"
            height="450px"
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
      )}
    </div>
  );
};

export default Room;
