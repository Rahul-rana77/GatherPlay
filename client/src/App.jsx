import{ Route, Routes } from 'react-router-dom'
import Homepage from './pages/home'
import './App.css'
import Joinroom from './pages/joinroom'
import Createroom from './pages/createroom'
import Login from './pages/login'
import SignUp from './pages/signup'
import Room from './pages/room'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/joinroom' element={< Joinroom/>} />
        <Route path='/createroom' element={<Createroom />} />
        <Route path='/room/:roomId' element={<Room />} />
      </Routes>
    </>
  )
}

export default App