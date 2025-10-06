import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Createroom = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [username, setUsername] = useState('');
  const [roomPassword, setRoomPassword] = useState('');
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    if(!name || !description || !username){
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
        body: JSON.stringify({ name, description, username, roomPassword})
      });
      const data = await res.json();
      if(res.status === 201){
        alert("Room created successfully");
        navigate(`/room/${data.room.roomId}`, {state: {room: data.room, username}});
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
        <input type="text" className="user-field" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} required />
        <input type="password" className="password-field" placeholder="Set Password (Optional)" onChange={(e)=>setRoomPassword(e.target.value)} />
      </div>
      <button onClick={handleCreateRoom}>Create Room</button>
    </div>
  )
}

export default Createroom