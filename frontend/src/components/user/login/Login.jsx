import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../../redux/user/userApi';
import { signInSuccess } from '../../../redux/user/userslice';
import './login.css';
import { validateUserLogin } from '@/utils/validations/userLoginValidation';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); 

  const [login] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formErrors = validateUserLogin({ email, password }); 

    if (Object.values(formErrors).every(error => !error)) { 
      setIsLoading(true); 

      try {
        const response = await login({ email, password });

        if (response.data.status) {
          dispatch(signInSuccess(response.data.userData));
          navigate('/home');
        } else {
      

          setErrorMessage({errors:response.data.message});

         
        }
      } catch (error) {
        console.error('Login failed:', error);
      } finally {
        setIsLoading(false); 
      }
    } else {
      setErrors(formErrors); 
      setErrorMessage({errors:'Invalid email or password'}); 
    }
  };

 
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' }); 
    setErrorMessage({errors:''}); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' }); 
    setErrorMessage({errors:''}); 
  };


  return (
    <>
      <div className="login-wrap">
        <div className="login">
          <div className="avatar">
            <span className="user"><img src="/userImages/user1.png" alt="User" /></span>
          </div>

          {errorMessage && <div className="error">{errorMessage.errors}</div>}

          <span className="user"><img src="" alt="" /></span>
          <form onSubmit={handleLogin}>
            <input type="" placeholder="Email" className="email" value={email} onChange={handleEmailChange} />
            {errors.email && <div className="error">{errors.email}</div>}
            <input type="password" placeholder="Password" className="pass" value={password} onChange={handlePasswordChange} />
            {errors.password && <div className="error">{errors.password}</div>}
            <button className="loginbutton" type="submit" disabled={isLoading}>Login</button>
          </form>
          <div className="p-4" wrap><br /><Link to="/signup"><span className="info">Don't have an account? <span className='signup' type="button">Signup</span></span></Link></div>
        </div>
      </div>
    </>
  )
}

export default Login;
