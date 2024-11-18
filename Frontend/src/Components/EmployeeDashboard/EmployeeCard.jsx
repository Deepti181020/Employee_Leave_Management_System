import React from 'react'
import { FaUser } from 'react-icons/fa'
import { useAuth } from '../../Context/authContext';
import "./EmployeeCard.css"

const EmployeeCard = ()  => {
    const { user } = useAuth();
  return (
    <div className='card'>
      <div className='emp-icons'>
        <FaUser/>
      </div>
      <div className='emp-items'>
        <p className='para'>Welcome Back</p>
        <p className='para'>{user.name}</p>
      </div>
    </div>
  )
}

export default EmployeeCard
