import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import './App.css';
import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {

  const {currentUser}=useContext(AuthContext)
  console.log(currentUser)

// Route Protection
  const ProtectedRoute=({children})=>{
    if(!currentUser){
      return<Navigate to="/Login"/>
    }
    return children;
  }

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
           <Route path="/">
             <Route index element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
             <Route path="Login" element={<Login/>}></Route>
             <Route path="Register" element={<Register/>}></Route>
           </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
