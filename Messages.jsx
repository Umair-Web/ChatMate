import React,{useContext,useState,useEffect} from 'react'
import { ChatContext } from '../context/ChatContext';
import Message from './Message'
import{doc,onSnapshot,db} from '../firebase'



const Messages = () => {
  const [messages,setMessages]=useState([])
  const {data}=useContext(ChatContext);
  useEffect(()=>{
    const unSub = onSnapshot(doc(db, "chats",data.chatID ), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
      console.log("All Messages",messages)
    });

      return ()=>{
        unSub()
      };
  },[data.chatID])
  // console.log("All Messages received inside <Messages>",messages)
  return (
    <div className='Messages'>
      {/* <Message/>
      <Message/>
      <Message/> */}

      {messages.map((m)=>{
        // {console.log("Message=>",m)}
        return( 
           <Message message={m} key={m.id}/>)
           })}
    
      
      
    </div>
  );
};

export default Messages;