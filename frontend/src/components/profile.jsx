import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = ({token}) => {
    const [userData, setUserData] = useState("");
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/edit-profile"); 
    }
    
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
    
    // if (loading) return <p>Loading user data...</p>;
    
    return (
        <>
        <div className="container">
            <h1>Welcome, {userData.username}!</h1>
            <p>Your email: {userData.email}</p>
            <p>Location: {userData.address}</p>
            <p>Gender: {userData.gender}</p>
            <button onClick={handleClick}>Edit Profile</button>
        </div>
        </>
    );
    }

    export default Profile;