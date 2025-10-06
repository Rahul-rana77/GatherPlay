import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    if(!email || !password){
      alert("Please fill all the fields");
      return;
    }
    try{
      const url = "https://gatherplay.onrender.com/api/v1/user/login";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password})
      });
      const data = await res.json();
      console.log(data);
      if(res.status === 200){
        alert("User LoggedIn successfully");
        navigate("/home");
      }
      else{
        alert(data.error);
        return;
      }
    }
    catch(err){
      console.log(err);
      alert("Error signing up. Please try again.", err);
  }
}

  return (
    <div className='room-container'>
      <h1>Login Page</h1>
      <p>This is where users can log in.</p>
      <input type="text" className='email-field' placeholder="Email" onChange={(e)=>setEmail(e.target.value)} required/>
      <input type="password" className='password-field' placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required/>
      <p>Don't have an account?{" "}
        <span style={{color: "blue", cursor: "pointer", hover: {textDecoration: "underline", color: "lightblue"}}}
        onClick = {()=> navigate("/")}>
          Sign Up
        </span>
          </p>
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default Login