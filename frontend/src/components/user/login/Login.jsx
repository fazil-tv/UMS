import React from 'react'
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLoginMutation } from '../../../redux/user/userApi';
import {signInSuccess} from '../../../redux/user/userslice'
import './login.css';



function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');


  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password });


      if (response.data.status) {
        dispatch(signInSuccess(response.data.userData));
        navigate('/home');
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      console.log('Login failed:', error);
    }
  };

  return (
    <>
      <div class="login-wrap">
        <div class="login">
          <div class="avatar">
          </div>
          <span class="user"><img src="" alt="" /></span>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="email" class="email" value={email} onChange={(e) => setEmail(e.target.value)} /><span class="arrow">&rarr;</span>
            <input type="password" placeholder="Password" class="pass" value={password} onChange={(e) => setPassword(e.target.value)} /><span class="arrow">&rarr;</span>
            <button className="loginbutton" type="submit" disabled={isLoading}>Login</button>
          </form>
        </div>
      </div>
      <div class="wrap mt-5 pt-5"><br /><Link to="/signup" className="underline"><span class="info">Dont have an account ? <span className='signup' type="button">Signup</span> </span></Link></div>
    </>
  )
}
export default Login