import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './signup.css';

import { useSignupMutation } from '../../../redux/user/userApi';
import { validateUserSignup } from '../../../utils/validations/userSignupValidation';


function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { isLoading }] = useSignupMutation();

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateUserSignup(formData);
    if (Object.values(formErrors).every(error => !error)) {

   
      try {
        await signup(formData);
        navigate('/');
      } catch (error) {
        console.error('Signup failed:', error);
      }
    } else {
      setErrors(formErrors);
    }
  }

  return (
    <>
      <div className="login-wrap">
        <div className="login">
          <div className="avatar">
          <span className="user"><img src="/userImages/user1.png" alt="User" /></span>
          </div>
         
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" className="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <div className="error">{errors.name}</div>}
            <input type="email" placeholder="Email" className="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <div className="error">{errors.email}</div>}
            <input type="password" placeholder="Password" className="pass" name="password" value={formData.password} onChange={handleChange} />
            {errors.password && <div className="error">{errors.password}</div>}
            <button className="signupbutton" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
          <div className="account-links p-4 " wrap>
            <Link to="/" className="info">
              <span class="info">Already have an account ? <span className='signup' type="button">Login</span></span>
            </Link>
          </div>
        </div>

      </div>


    </>
  );
}

export default Signup;
