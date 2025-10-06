import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Joinroom = () => {
  const [roomLink, setRoomLink] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [roomPassword, setRoomPassword] = React.useState('');
  const navigate = useNavigate();

  const getPostData = async () => {
    if(!roomLink || !username){
      alert("Please fill all the fields");
      return;
    }
    try{
      const url = "https://gatherplay.onrender.com/api/v1/room/join";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ roomLink, username, roomPassword})
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 200){
        alert("Joined room successfully");
        navigate(`/room/${data.roomId}`, {state: {room: data.room, username}});
      }
    } catch (error) {
      console.error("Error joining room:", error);
    }
  }

  return (
    <div className='room-container'>
      <h1>Join Room Page</h1>
      <p>This is where users can join a room.</p>
      <div className="input-field">
        <input type="text" className="user-field" placeholder="Enter Username" onChange={(e)=>setUsername(e.target.value)} required />
        <input type="text" className="room-field" placeholder="Enter Room Link" 
        onChange={(e)=>setRoomLink(e.target.value)} required />
        <input type="password" className="password-field" placeholder="Password (Optional)" onChange={(e)=>setRoomPassword(e.target.value)}/>
      </div>
      <button onClick={getPostData}>Join Room</button>
    </div>
  )
}

export default Joinroom