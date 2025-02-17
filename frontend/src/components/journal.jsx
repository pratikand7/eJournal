import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../css/journal.css";
import { toast } from "react-toastify";

const Journal = ({ token }) => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const key = userData?.email;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/user`, {
          headers: { Authorization: token },
        });
        setUserData(res.data);
      } catch (err) {
        alert("Failed to fetch user data. Please check your connection.");
        setLoading(false);
      }
    };
    fetchUserData();
  }, [token]);

  useEffect(() => {
    if (key) {
      const fetchJournals = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/journals?key=${key}`,
            { headers: { Authorization: token } }
          );
          setJournals(res.data);
        } catch (err) {
          alert("Failed to fetch journal data. Please check your connection.");
        } finally {
          setLoading(false);
        }
      };
      fetchJournals();
    }
  }, [key, token]);

  const handleClick = () => {
    localStorage.removeItem("token");
    toast("You have been logged out.");
    navigate("/");
  };

  if (loading) return <p>Loading journal data...</p>;

  return (
    <>
      <nav id="navbar">
        <div class="logo">
          <a href="/">eJournal</a>
        </div>
        <div>
          <button onClick={handleClick}><img src="icons/icons8-logout-50.png" alt="" /> </button>
        </div>
      </nav>
      <div className="journals-container">
        <a href="/dashboard">
          <img className="back" src="icons/icons8-back-64.png" alt="" />
        </a>
        <h1>Your Journals</h1>
        {journals.length > 0 ? (
          journals.map((journal) => (
            <div className="journal-card" key={journal._id}>
              <h3>Date: {new Date(journal.date).toLocaleDateString()}</h3>
              <p>Text: {journal.body}</p>
            </div>
          ))
        ) : (
          <p>No journals found. Start by adding some entries!</p>
        )}
      </div>
    </>
  );
};

export default Journal;
