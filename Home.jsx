import React from 'react'
// import Login from './Login'
// import Register from './Register'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'
import '../style.scss';
const Home = () => {
  return (
    <div className='home'>
        <div className="container">
            <Sidebar/>
            <Chat/>
        </div>
      
    </div>
  )
}

export default Home
