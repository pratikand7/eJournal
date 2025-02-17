import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";
import { toast, ToastContainer } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      const errorMessage = err.response?.data?.error
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <nav id="navbar">
        <div class="logo">
          <a href="/">eJournal</a>
        </div>
      </nav>
        
      <form id="log-form" onSubmit={handleSubmit}>
        <h1>Login Here!</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <a href="/register">Don't have an account?</a>
      </form>
      <ToastContainer />
    </>
  );
};

export default Login;
