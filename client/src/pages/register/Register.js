import "./register.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3002";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

 async function handleSubmit(e){
    e.preventDefault();
    setError(false);
    try{
      
      const res = await axios.post('/auth/register',{
        username,
        email,
        password
      })
      //after creating user go to login page
      res.data && window.location.replace('login');
    }catch(err){
      setError(true);
    }


  }

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your username..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <input
          className="registerInput"
          type="text"
          placeholder="Enter your email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          className="registerInput"
          type="password"
          placeholder="Enter your password..."
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLoginButton">
        <Link className="link" to="/login">
        Login
        </Link>
        </button>
        {error && alert("Something went wrong!")}
        {/* {error && <span style={{color:"green", marginTop: "10px"}}>something went worong!</span>} */}
    </div>
  );
}
