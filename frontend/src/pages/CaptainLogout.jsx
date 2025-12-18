import React, { useContext, useEffect } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import { useNavigate } from "react-router-dom";
import axios from "axios"

const CaptainLogout = () => {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/captains/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/captain-login');
        }
    })
  return (
    <div>
      Captain Logout Page
    </div>
  )
}

export default CaptainLogout
