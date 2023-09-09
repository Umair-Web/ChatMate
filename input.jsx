import React, { useState,useContext } from 'react'
import image from '../images/icons8-image-100.png';
import attach from '../images/attach.png'
import '../style.scss';
import { updateDoc,doc,db,storage,uploadBytesResumable,ref,getDownloadURL,updateProfile,auth,setDoc } from '../firebase';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { Timestamp, arrayUnion, serverTimestamp } from 'firebase/firestore';
import{v4 as uuid} from "uuid"


const Input = () => {

  const[text,setText]=useState("");
  const[img,setImg]=useState(null)

  const{currentUser}=useContext(AuthContext)
  const{data}=useContext(ChatContext)

  const handleSend=async()=>{
    if(img){
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      
uploadTask.on('state_changed', 

(snapshot) => {
 
  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  console.log('Upload is ' + progress + '% done');
  switch (snapshot.state) {
    case 'paused':
      console.log('Upload is paused');
      break;
    case 'running':
      console.log('Upload is running');
      break;
  }},
 
  (error) => {

    console.log("Error at upload task",error)

  //  Seterr(true);
  }, 

  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      await updateDoc(doc(db,"chats",data.chatID),{
        messages:arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser.uid,
            date:Timestamp.now(),
            img:downloadURL
        })
      })
     
    });
  }
);




    }
    else{
      await updateDoc(doc(db,"chats",data.chatID),{
        messages:arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser.uid,
            date:Timestamp.now()
        })
      })
    }


    await updateDoc(doc(db,"userChats",currentUser.uid),{
      [data.chatID + ".lastMessage"]:{
        text
      },[data.chatID+".date"]:serverTimestamp()
    })
    await updateDoc(doc(db,"userChats",data.user.uid),{
      [data.chatID + ".lastMessage"]:{
        text
      },[data.chatID+".date"]:serverTimestamp()
    })


   setText("");
   setImg(null);
  }
  return (
    <div className='input'>
      <input type='text' placeholder='Type here.....' onChange={(e)=>{setText(e.target.value)}} value={text}/>
      <div className='send'>
        <img src={attach} alt="" />
        <input type="file" style={{display:"none"}} id='file' onChange={(e)=>{setImg(e.target.files[0])}}/>
        <label htmlFor="file">
            <img src={image} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>

      </div>
    </div>
  )
}

export default Input

