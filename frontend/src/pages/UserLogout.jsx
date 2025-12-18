import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const UserLogout = () => {
    const token = localStorage.getItem('userToken');
    const navigate = useNavigate();

    axios.get(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            localStorage.removeItem('token');
            navigate('/login');
        }
    })

  return (
    <div>
      User Logout Page
    </div>
  )
}

export default UserLogout
