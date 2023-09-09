import React, { useContext } from 'react'
import user from '../images/user.jpg'
import { signOut ,auth} from '../firebase'
import { AuthContext } from '../context/AuthContext'
const Navbar = () => {
  const {currentUser}=useContext(AuthContext)
  return (
    <div className='Navbar'>
        <span className='logo'>ChatMate</span>
        <div className='user'>
         <img src={currentUser.photoURL} alt="" />
         <span>{currentUser.displayName}</span>
         <button onClick={()=>signOut(auth)}>logout</button>
        </div>
    </div>
  )
}

export default Navbar
