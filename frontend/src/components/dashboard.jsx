import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/dashboard.css";
import { toast, ToastContainer } from "react-toastify";

const Dashboard = ({ token }) => {
  const [userData, setUserData] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const key = userData?.email;

  const handleClick = () => {
    localStorage.removeItem("token");
    toast("You have been logged out.");
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/journals`,
        { key, date, body },
        { headers: { Authorization: token } }
      );
      toast("Journal saved!");
      setDate("");
      setBody("");
    } catch (err) {
      alert("Failed to save journal. Please try again.");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
          headers: { Authorization: token },
        });
        setUserData(res.data);
      } catch (err) {
        alert("Failed to fetch user data. Please check your connection.");
      }
    };
    fetchUserData();
  }, [token]);

  if (!userData) return <p>Loading user data...</p>;

  return (
    <>
      <nav id="navbar">
        <div class="logo">
          <a href="/">eJournal</a>
        </div>
        <input type="checkbox" className="toggler"></input>
        <div className="hamburger">
          <div></div>
        </div>
        <div className="menu">
          <div>
            <ul>
              <li>
                <a href="/profile" ><img id="profile" src="icons8-male-user-48.png"></img>Profile</a>
              </li>
              <li>
                <button onClick={handleClick}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container">
        <div id="dashboard-header">
          <h1>Welcome, {userData.username}</h1>
        </div>
        <form id="dashboard-form" onSubmit={handleSubmit}>
          <div>
            <label>Date : </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            
          </div>
          <div>
            <label>How was your day?</label>
            {/* <input
              id="data"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            /> */}
            <textarea id="data" 
            value={body}
            onChange={(e)=> setBody(e.target.value)} ></textarea>
          </div>
          <div>
            <button id="" type="submit">
              Save Journal
            </button>
            <a id="journal" href="/journal">
              Your saved journals
            </a>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default Dashboard;
