import React from 'react'
import './ManagerSidebar.css'
import { NavLink } from 'react-router-dom'
import { FaBuilding, FaTachometerAlt, FaUsers } from 'react-icons/fa'
const ManagerSidbar = () => {
    return (
        <div className="manager-sidebar">
            <div className='manager-sidebar-title'>
                <h3>Employee Leave MS</h3>
            </div>
            <div className='sidebar-items'> 
                    <NavLink to="/manager-dashboard" className="manager-sidebar-menu">
                        <FaBuilding />
                        <span className="sidebar-title">Dashboard</span>
                    </NavLink>
                    <NavLink to="/manager-dashboard/employees" className="manager-sidebar-menu">
                        <FaUsers />
                        <span className="sidebar-title">Employees</span>
                    </NavLink>
                    <NavLink to="/manager-dashboard/leaves" className="manager-sidebar-menu">
                        <FaTachometerAlt />
                        <span className="sidebar-title">Leaves</span>
                    </NavLink>
            </div>
        </div>
    )
}

export default ManagerSidbar
