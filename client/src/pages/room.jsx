import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("https://gatherplay.onrender.com");

export default function Room({ roomId }) {
  const localVideo = useRef();
  const [peers, setPeers] = useState({});
  const localStream = useRef();

  const peerConnections = useRef({});

  useEffect(() => {
    const start = async () => {
      localStream.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localVideo.current.srcObject = localStream.current;

      socket.emit("join-room", roomId);

      socket.on("user-joined", async (userId) => {
        const pc = createPeerConnection(userId);
        peerConnections.current[userId] = pc;

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        socket.emit("offer", { roomId, offer, to: userId });
      });

      socket.on("offer", async ({ from, offer }) => {
        const pc = createPeerConnection(from);
        peerConnections.current[from] = pc;

        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.emit("answer", { roomId, answer, to: from });
      });

      socket.on("answer", async ({ from, answer }) => {
        const pc = peerConnections.current[from];
        await pc.setRemoteDescription(new RTCSessionDescription(answer));
      });

      socket.on("ice-candidate", async ({ from, candidate }) => {
        const pc = peerConnections.current[from];
        if (candidate) await pc.addIceCandidate(new RTCIceCandidate(candidate));
      });

      socket.on("user-left", (userId) => {
        if (peerConnections.current[userId]) {
          peerConnections.current[userId].close();
          delete peerConnections.current[userId];
          setPeers((prev) => {
            const updated = { ...prev };
            delete updated[userId];
            return updated;
          });
        }
      });
    };

    start();

    return () => {
      socket.disconnect();
      Object.values(peerConnections.current).forEach((pc) => pc.close());
    };
  }, [roomId]);

  function createPeerConnection(userId) {
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    localStream.current.getTracks().forEach((track) => {
      pc.addTrack(track, localStream.current);
    });

    pc.onicecandidate = (event) => {
      if (event.candidate)
        socket.emit("ice-candidate", {
          to: userId,
          candidate: event.candidate,
        });
    };

    pc.ontrack = (event) => {
      const [stream] = event.streams;
      setPeers((prev) => ({ ...prev, [userId]: stream }));
    };

    return pc;
  }

  return (
    <div className="flex flex-wrap gap-4 p-4">
      <div>
        <h2>You</h2>
        <video ref={localVideo} autoPlay muted playsInline width="300" />
      </div>
      {Object.entries(peers).map(([id, stream]) => (
        <div key={id}>
          <h2>{id}</h2>
          <video
            autoPlay
            playsInline
            width="300"
            ref={(el) => el && (el.srcObject = stream)}
          />
        </div>
      ))}
    </div>
  );
}
