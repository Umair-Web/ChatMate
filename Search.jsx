import React, { useContext, useState } from 'react'
// import user from '../images/user.jpg'
import{collection,query,where,auth,db,doc,getDocs,setDoc,updateDoc,getDoc} from '../firebase';
import{AuthContext} from '../context/AuthContext'
import { serverTimestamp } from 'firebase/firestore';

const Search = () => {

  const[username,setUsername]=useState("");
  const[user,setUser]=useState(null);
  const[err,setErr]=useState(false);
  console.log("Username before setting=>",username)
  console.log("User before setting=>",user)

  const {currentUser}=useContext(AuthContext);
  console.log("Current user here=>",currentUser)
  const handleSearch=async()=>{ 

   const q=query(collection(db,"users"),where("Name","==",username)
   );

   try{
   const querySnapshot = await getDocs(q);
   querySnapshot.forEach((doc) => {
   // doc.data() is never undefined for query doc snapshots
   console.log(doc.id, " => ", doc.data());
   setUser(doc.data())
    });
  }
  catch(err){
    console.log("Error while searching data",err)
    setErr(true);
  }
  }
  const handlekey=(e)=>{
    e.code==="Enter" && handleSearch();

   
  };
  const handleSelect=async()=>{

    // Cheching whetgher group chats in firestore exsits or not
    const combineID=currentUser.uid>user.uid
    ?currentUser.uid+user.uid
    :user.uid+currentUser.uid;

    try{
      const res=await getDoc(doc(db,"chats",combineID));

      if(!res.exists()){
        
        // if group chat doesnot exsits create new one
        await setDoc(doc(db,"chats",combineID),{messages:[]});

        // Create user chats

        // Data Structure
        // userChats:{
        //   jamesID:{
        //     combineID:{
        //       userInfo:{
        //         dn,img,id
        //       },
        //       lastMessage:""
        //       date:
        //     }
        //   }
        // }
        try{

          await updateDoc(doc(db,"userChats",currentUser.uid),{
            [combineID+".userInfo"]:{
              uid:user.uid,
              displayName:user.Name,
              photoURL:user.photoURL,
            },
            [combineID+".date"]:serverTimestamp(),

            
         
          });
        } 
        catch(error){
          console.log("Error while setting chats data in current user ",error)
        }

        try{

          await updateDoc(doc(db,"userChats",user.uid),{
            [combineID+".userInfo"]:{
              uid:currentUser.uid,
              displayName:currentUser.displayName,
              photoURL:currentUser.photoURL,
            },
            [combineID+".date"]:serverTimestamp(),

            
         
          });
        }catch(error){
          console.log("Error while setting chats data in user matlab jisko send kia? ",error)
        }



      }
    }catch(err){
      console.log("Error while getting combine id data",err)
    }
    setUser(null);
    setUsername("");
  };
  return (
    
    <div className='Search'>
        <div className='searchForm'>
            <input type="text" name="" id="" placeholder='find a user' onKeyDown={handlekey} onChange={e=>setUsername(e.target.value)} value={username}/>
        </div>
        {err && <span>User not found</span>}

        {user && <div className='userChat' onClick={handleSelect}>
            <img 
            src={user.photoURL} 
            alt="" 
            />
            <div className='userChatInfo'>
                <span>{user.Name}</span>
            </div>
        </div>
        }
        
      
    </div>
  )
}

export default Search
