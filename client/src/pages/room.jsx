import React, { useEffect } from 'react'
import { useLoaderData, useParams } from "react-router-dom";

const Room = () => {
  const params = useParams();
  const id = params.roomId;
  const roomDetails = useLoaderData();
  console.log(roomDetails);
  const getDetails = async () => {
  try {
    const response = await fetch(`https://gatherplay.onrender.com/api/v1/room/${id}`, {
        method: "GET",
        });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching room details:", error);
    throw error;
  }
};

  useEffect(() => {
    getDetails()
  }, []);
  return (

    <div>
      <h1>Room Page</h1>
      <p>This is where the room functionality will be implemented.</p>
       <div >
      <h1 >
        Room: {params.roomId || "Loading..."}
      </h1>
      <p >Room:</p>
      <p ></p>

      <div >
        <p>
          Welcome, <span></span> 👋
        </p>
      </div>
    </div>
    </div>
  )
}

export default Room