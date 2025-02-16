import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username && !email && !address && !password) {
      toast.error("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/register`, { username, email, address, password });
      toast('Registration successful!');
      navigate('/');
    } catch (err) {
      const errorMessage = err.response?.data?.errors
      toast.error(errorMessage);
    }
  };

  return (
    <>
    <nav id="navbar">
        <div className="logo">
          <a href='/'>eJournal</a>
        </div>
      </nav>
    <form id='log-form' onSubmit={handleSubmit}>
      <h1>Register Here!</h1>
      <input
        type="text"
        placeholder="Enter your full name."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your Email."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter your Location."
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter your password."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
          type="password"
          placeholder='Re-enter your password.'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      <button type="submit">Register</button>
      <a href="/">Already have an account?</a>
    </form>
    <ToastContainer/>
    </>
    
  );
};

export default Register;
