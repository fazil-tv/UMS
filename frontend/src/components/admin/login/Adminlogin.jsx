import React, { useState } from 'react'
import './adminlogin.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAdminloginMutation } from '@/redux/admin/adminApi';
import { validateadminLogin } from '@/utils/validations/adminLoginValidation';

function Adminlogin() {





  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);


  const [login] = useAdminloginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    const formErrors = validateadminLogin({ email, password });

    if (Object.values(formErrors).every(error => !error)) {
      setIsLoading(true);


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
      } finally {
        setIsLoading(false);
      }

    }
    else {
      setErrors(formErrors);
      setErrorMessage('Invalid email or password');
    }
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: '' }); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: '' }); 
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
            <input name='email' type="email" placeholder="email" class="email" value={email} onChange={handleEmailChange} /><span class="arrow">&rarr;</span>
            {errors.email && <div className="error">{errors.email}</div>}
            <input name='password' type="password" placeholder="Password" class="pass" value={password} onChange={handlePasswordChange} /><span class="arrow">&rarr;</span>
            {errors.password && <div className="error">{errors.password}</div>}
            <button className="loginbutton" type="submit" >Login</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Adminlogin