import React, { useContext,useEffect,useRef } from 'react'
import user from '../images/user.jpg'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import moment from 'moment/moment'

const Message = ({message}) => {

  const{currentUser}=useContext(AuthContext);
  const{data}=useContext(ChatContext);
  const ref=useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"})
  },[message])

  // console.log("messages inside message",message)

  return (
    // <div className='message '>
    //   <div className='messageInfo'>
    //     <img src={user} alt="" />
    //   </div>
      
    //   <div className='messageContent'>
    //   <p>Hello</p>
    //   <img src={user} alt="" />
    //   </div>
    // </div>


    <div ref={ref}
    className={`message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='messageInfo'>
        <img src={message.senderId === currentUser.uid 
          ?currentUser.photoURL
          :data.user.photoURL} alt="" />
        <span>{moment((message.date).toDate()).format('hh:mm A')}</span>
      </div>
      <div className='messageContent'>
        <p>{message.text}</p>
        {message.img &&
          <img src={message.img} alt="" />
          }
        
      </div>
    </div>
  )
}

export default Message;