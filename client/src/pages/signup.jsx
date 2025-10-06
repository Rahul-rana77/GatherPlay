import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!username || !email || !password){
      alert("Please fill all the fields");
      return;
    }
    try{
      const url = "https://gatherplay.onrender.com/api/v1/user/register";
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({username, email, password})
      });
      const data = await res.json();
      if(res.status === 201){
        alert("User registered successfully");
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
      <h1>Sign Up Page</h1>
      <p>This is where users can sign up.</p>
      <form onSubmit={handleSubmit}>
      <div className="input-field"> 
        <input type="text" className="user-field" placeholder="Username"
        value={username} onChange={(e)=>setUsername(e.target.value)} required />
        <input type="email" className="email-field" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" className="password-field" placeholder="Password" 
        value={password}
        onChange={(e)=>setPassword(e.target.value)} required />
        <p>Already have an account?{" "}
          <span 
          style={{color: "blue", cursor: "pointer", hover: {textDecoration: "underline", color: "lightblue"}}}
          onClick = {()=> navigate("/login")}>
            Login
          </span>
        </p>
      </div>
      <button onClick={handleSubmit}>Sign Up</button>
      </form>
    </div>
  )
}

export default SignUp