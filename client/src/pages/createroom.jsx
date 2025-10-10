import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Createroom = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState('false');
  const [roomPassword, setRoomPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    if(!name || !description || !isPrivate){
      alert("Please fill all the fields");
      return;
    }
    try{
      const url = "https://gatherplay.onrender.com/api/v1/room/create";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, description, isPrivate, roomPassword})
      });
      const data = await res.json();
      if(res.status === 201){
        alert("Room created successfully");
        navigate(`/room/${data.room.roomId}`, {state: {room: data.room}} );
      }
      else{
        alert(data.error || "Error creating room");
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  }
  return (
    <div className='room-container'>
      <h1>Create Room Page</h1>
      <p>This is where users can create a room.</p>
      <div className="input-field">
        <input type="text" className="room-field" placeholder="Room Name" onChange={(e)=>setName(e.target.value)} required />
        <input type="text" className="room-field" placeholder="Description" onChange={(e)=>setDescription(e.target.value)} required />
        <select className="room-field"value={isPrivate === "" ? "" : String(isPrivate)} onChange={(e)=>setIsPrivate(e.target.value)} required>
          <option value="" disabled selected>Select Privacy</option>
          <option value="true">Private</option>
          <option value="false">Public</option>
        </select>
        <input type="password" className="password-field" placeholder="Set Password (Optional)" onChange={(e)=>setRoomPassword(e.target.value)} />
      </div>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  )
}

export default Createroom