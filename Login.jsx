import React,{useState} from 'react';
import '../style.scss';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Add from '../images/add-image.png';
import{auth,signInWithEmailAndPassword} from '../firebase'


const Login = () => {

  let [err,Seterr]=useState(false);

const navigate=useNavigate();

const handleSubmission=async(e)=>{
 e.preventDefault();

 let email=e.target[0].value;
 let password=e.target[1].value;
 
//  console.log(file);

try{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   
    const user = userCredential.user;
    console.log("User signed in")
    navigate("/")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("User Didnot sign in Error=>",error)
  });

}
catch(err)
{
  Seterr(err)
}
}
  return (
    <div>
      <div className="formcontainer">
        <div className="formwrapper">
            <span className='logo'>ChatMate</span>
            <span className='title'>Login</span>
            <form onSubmit={handleSubmission}>
                <input type="email" placeholder='Email' />
                <input type="password" placeholder='password' />
                <input type="file" id='file' style={{display:"none"}}/>
                
                <button>Sign in</button>
                {err && <span>Something went wrong</span>}
            </form>
            <span>Don't have an account? <Link to="/Register">Register</Link></span>
        </div>
      </div>
    </div>
  )
}

export default Login
