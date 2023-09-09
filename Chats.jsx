import React, { useEffect, useState,useContext } from 'react'
import '../style.scss';
import{doc,db,onSnapshot} from '../firebase'
import user from '../images/user.jpg'
import{AuthContext} from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext';

const Chats = () => {

    const [chats,Setchats]=useState([]);
    const {currentUser}=useContext(AuthContext);
    const {dispatch}=useContext(ChatContext);
    // console.log("Current user in uid",currentUser)
    useEffect(()=>{

        const getChats=()=>{
            const unsub = onSnapshot(doc(db, "userChats",currentUser.uid ), (doc) => {
                Setchats(doc.data())
                // console.log("chat after setting chat",chats)
                // console.log("Current data: in chats", doc.data());
             });
             return ()=>{
                 unsub();
            }
        };


      currentUser.uid &&getChats();
    //    console.log("Data after calling get chats",chats)
    },[currentUser.uid])
    // console.log("object Enterires Chats=>",Object.entries(chats))
    const handleSelect=(u)=>{
        dispatch({type:"CHANGE_USER",payload:u})
        // console.log(u)
    }
  return (
    <div className='Chats'>
        {Object.entries(chats)?.sort((a,b)=>b[1].date-a[1].date).map((chat)=>(
      <div className='userChat' key={chat[1]} onClick={()=>handleSelect(chat[1].userInfo)}>
            <img src={chat[1].userInfo.photoURL} alt="" />
            <div className='userChatInfo'>
                <span>{chat[1].userInfo.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
            </div>
        </div>


        ))}
    </div>
  )
}

export default Chats
