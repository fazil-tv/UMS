import React, { useState } from 'react'
import './adminlogin.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAdminloginMutation } from '@/redux/admin/adminApi';

function Adminlogin() {


 


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState('');
  
   
    const [login, { isLoading }] = useAdminloginMutation();
  
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await login({ email, password });
            console.log(response);
            if (response.data) {
                navigate('/admindashboard');
                
            } else {
                setErrorMessage('Login failed: Invalid credentials');
            }
        } catch (error) {
            setErrorMessage('Login failed: ' + error.message);
        }
    };


  return (
    <>

     <div class="login-wrap">
        <div class="login">
            <h1>admin login</h1>
          <div class="avatar">
          </div>
          <span class="user"><img src="" alt="" /></span>
          <form onSubmit={handleLogin}>
            <input name='email' type="email" placeholder="email" class="email" value={email} onChange={(e) => setEmail(e.target.value)} /><span class="arrow">&rarr;</span>
            <input name='password' type="password" placeholder="Password" class="pass" value={password} onChange={(e) => setPassword(e.target.value)} /><span class="arrow">&rarr;</span>
            <button className="loginbutton" type="submit" >Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Adminlogin