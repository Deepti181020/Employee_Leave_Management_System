import React from 'react'
import './ManagerNavbar.css'
import { useAuth } from '../../Context/authContext';
const ManagerNavbar = () => {

const { user ,logout } = useAuth();
  return (
      <div className='manager-navbar'>
          <p>Welcome {user.name}</p>
          <button className='manager-logout-btn' onClick={logout} >
        Logout
      </button>
    </div>
  )
}

export default ManagerNavbar
