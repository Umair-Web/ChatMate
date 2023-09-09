import{React,useState}  from 'react'
import '../style.scss';
import Add from '../images/add-image.png';
import { app,auth,createUserWithEmailAndPassword,storage, ref, uploadBytesResumable, getDownloadURL, updateProfile,db,doc, setDoc } from "../firebase";
import { useNavigate,Link } from 'react-router-dom';


const Register = () => {

let [err,Seterr]=useState(false);

const navigate=useNavigate();

const handleSubmission=async(e)=>{
 e.preventDefault();
 let userName=e.target[0].value;
 let email=e.target[1].value;
 let password=e.target[2].value;
 let file=e.target[3].files[0];
//  console.log(file);

try{
// Authentication
const res=await createUserWithEmailAndPassword(auth, email, password)

.then((userCredential) => {
  const user = userCredential.user;
  console.log("User made at authentication",user);

  
})

.catch((error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  console.log("User error while authentication",error);
});


const storageRef = ref(storage, userName);

const uploadTask = uploadBytesResumable(storageRef, file);


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

   Seterr(true);
  }, 

  () => {
   
    getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
      console.log('File available at', downloadURL);
      await updateProfile(auth.currentUser,{
        displayName:userName,
        photoURL:downloadURL,
      })
      console.log("Current user after update",auth.currentUser)

      try{
        await setDoc(doc(db, "users", auth.currentUser.uid), {
        uid:auth.currentUser.uid,
        Name: userName,
        Email: email,
        Password:password,
        photoURL:downloadURL
      });
      }

      catch(error){
        console.log("Firestore Error",error)
      }

      try{
        await setDoc(doc(db,"userChats",auth.currentUser.uid),{})
        navigate("/")
      }
      catch(error){
        console.log("Error occured while making user chat =>",error)
      }
     
    });
  }
);



}
catch(err){
  console.log("Error of first try",err)
Seterr(true);
}

}


  return (
    <div>
      <div className="formcontainer">
        <div className="formwrapper">
            <span className='logo'>ChatMate</span>
            <span className='title'>Register</span>
            <form onSubmit={handleSubmission}>
                <input type="text" placeholder='User name' />
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='password' />
                <input type="file" id='file' style={{display:"none"}}/>
                <label htmlFor="file">
                    <img src={Add} alt="" />
                    <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
                {err && <span>Something went wrong</span>}
            </form>
            <span>Already have an account? <Link to={"/login"}> Login</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Register;



