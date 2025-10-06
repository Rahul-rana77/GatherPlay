import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";

const Room = () => {
  const [data, setData] = React.useState("");
  const { roomId } = useParams();

  const getData = async () => {
    const response = await fetch(`https://gatherplay.onrender.com/api/v1/room/${roomId}`,{
    method: "GET",
    });
    const data = await response.json();
    console.log(data);
    return data;
}

  useEffect(() => {
    getData().then(fetchedData => setData(fetchedData));
  }, []);
  return (

    <div>
      <h1>Room Page</h1>
      <p>This is where the room functionality will be implemented.</p>
       <div >
      <h1 >
        Room: {data.roomId || "Loading..."}
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