import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import ReactPlayer from "react-player";

const socket = io("https://gatherplay.onrender.com");

export default function Room({ roomId }) {
  const playerRef = useRef(null);
  const [videoUrl, setVideoUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  );
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    socket.emit("join-room", roomId);

    socket.on("play", (time) => {
      playerRef.current.seekTo(time, "seconds");
      setPlaying(true);
    });

    socket.on("pause", (time) => {
      playerRef.current.seekTo(time, "seconds");
      setPlaying(false);
    });

    socket.on("seek", (time) => {
      playerRef.current.seekTo(time, "seconds");
    });

    socket.on("video-change", (videoId) => {
      setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
    });

    return () => socket.removeAllListeners();
  }, [roomId]);

  const handlePlay = () => {
    const time = playerRef.current.getCurrentTime();
    socket.emit("play", { roomId, time });
  };

  const handlePause = () => {
    const time = playerRef.current.getCurrentTime();
    socket.emit("pause", { roomId, time });
  };

  const handleSeek = () => {
    const time = playerRef.current.getCurrentTime();
    socket.emit("seek", { roomId, time });
  };

  const changeVideo = () => {
    const id = prompt("Enter YouTube Video ID:");
    if (id) socket.emit("video-change", { roomId, videoId: id });
  };

  return (
    <div>
      <h2>Room: {roomId}</h2>

      <ReactPlayer
        ref={playerRef}
        url={videoUrl}
        playing={playing}
        controls
        onPlay={handlePlay}
        onPause={handlePause}
        onProgress={handleSeek}
      />

      <button onClick={changeVideo}>Change Video</button>
    </div>
  );
}
