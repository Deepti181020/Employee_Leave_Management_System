import React from 'react'
import './EmployeeSidebar.css'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaTachometerAlt, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../Context/authContext'

const EmployeeSidebar = () => {

    const { user } = useAuth();
    return (
        <div className="eployee-sidebar">
            <div className='employee-sidebar-name'>
                <h3>Employee Leave MS</h3>
            </div>
            <div className='employee-sidebar-items'>
                <NavLink to="/employee-dashboard" className="employee-sidebar-menu">
                    <FaBuilding />
                    <span className="sidebar-title">Dashboard</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/profile/${user._id}`} className="employee-sidebar-menu">
                    <FaUsers />
                    <span className="sidebar-title">My Profile</span>
                </NavLink>
                <NavLink to={`/employee-dashboard/leaves/${user._id}`} className="employee-sidebar-menu">
                    <FaTachometerAlt />
                    <span className="sidebar-title">Leaves</span>
                </NavLink>
            </div>
        </div>
    )
}

export default EmployeeSidebar
