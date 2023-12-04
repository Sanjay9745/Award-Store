import "../assets/css/Login.css"
import axios from 'axios';
import SERVER_URL from "../config/SERVER_URL";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
const navigate = useNavigate();
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  useEffect(() => {
    if(localStorage.getItem("token")){
      axios.get(SERVER_URL+"/user/protected",{
        headers:{
         "x-access-token":localStorage.getItem("token")
        }
      }).then((res)=>{
        if(res.status===200){
          navigate("/")
        }
      }).catch((err)=>{
        console.log(err);
        
      })
    }
  }, [navigate])
  const handleSubmit=()=>{
  //validate data
  if(!email || !password){
  console.log("Please fill all the data");
    return
  }
  axios.post(SERVER_URL+"/user/login",{

      email:email,
      password:password
      }).then((res)=>{
      if(res.status===200){
          localStorage.setItem("token",res.data.token);
          navigate("/")
      }
      }).catch((err)=>{
      console.log(err);
      
  })
}
const handleForgotPassword=()=>{
  if (!email) {
    alert("Please enter your email address");
    return;
  }
  axios
    .post(SERVER_URL + "/user/forgot-password", {
      email: email,
    })
    .then((res) => {
      if (res.status === 200) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}
  return (
    <>
      <div className="container">
        <div className="login-form-container">
        <div className="login-form">
          <h2>Login</h2>
  
            <input type="text" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
            <h6 onClick={ handleForgotPassword}>Forgot Password ?</h6>
            <button type="submit" onClick={handleSubmit}>Login</button>
            <p onClick={()=> navigate("/register")}>Don't Have An Account?&nbsp;<strong>Register</strong></p>
        
        </div>
        </div>
      </div>
    </>
  )
}

export default Login
