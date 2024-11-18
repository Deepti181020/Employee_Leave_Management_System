import React from 'react'
import './EmployeeNavbar.css'
import { useAuth } from '../../Context/authContext';

const EmployeeNavbar = () => {
    const { user ,logout } = useAuth();
  return (
      <div className='employee-navbar'>
          <p>Welcome {user.name}</p>
          <button className='employee-logout-btn' onClick={logout} >
        Logout
      </button>
    </div>
  )
}

export default EmployeeNavbar
