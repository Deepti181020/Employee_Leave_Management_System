import React from 'react'
import EmployeeSidebar from '../../Components/EmployeeDashboard/EmployeeSidebar';
import EmployeeNavbar from '../../Components/EmployeeDashboard/EmployeeNavbar';
import './EmpDashBoard.css'
import { Outlet } from 'react-router-dom';

const EmpDashBoard = () => {
    return (
        <div className='emp-dashboard'>
                <EmployeeSidebar className=" dashboard-sidebar-emp" />
                <div className='dashboard-nav'>
                <EmployeeNavbar />
             </div>
                <div className=" emp-dashboard-body">
                    <Outlet className="emp-outlet"/>
                </div>        
        </div>

    );
}

export default EmpDashBoard

