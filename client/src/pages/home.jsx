
import React from 'react'
import { Link } from 'react-router-dom'

const Homepage = () => {
  return (
    <>
    <div className='home-container'>
        <h1>Welcome to GatherPlay</h1>
        <p>Join Once, Connect Forever.</p>
        <div className="Link-container">
          <Link to='/joinroom'className='join-link'>Join Room</Link>
          <Link to="/createroom" className='create-link'>Create Room</Link>
        </div>
    </div>
    </>
  )
}

export default Homepage