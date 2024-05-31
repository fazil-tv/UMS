import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useSignupMutation } from '../../../redux/user/userApi';




function Signup() {

  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { isLoading }] = useSignupMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData);
      navigate('/');
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  return (
    <>
      <div className="login-wrap">
        <div className="login">
          <div className="avatar">
          </div>
          <span className="user"><img src="" alt="User" /></span>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" className="name" name="name" value={formData.name} onChange={handleChange} />
            <input type="email" placeholder="Email" className="email" name="email" value={formData.email} onChange={handleChange} />
            <input type="password" placeholder="Password" className="pass" name="password" value={formData.password} onChange={handleChange} />

            <button className="signupbutton" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
      <div className="account-link">
        <Link to="/" className="info">
        <span class="info">Already have an account ? <span className='signup' type="button">Login</span></span>
        </Link>
      </div>
      <div className="hint">Press enter!</div>
    </>
  );
}

export default Signup;
