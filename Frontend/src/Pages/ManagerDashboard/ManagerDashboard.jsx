import React from 'react';
import { useAuth } from '../../Context/authContext';
import { Outlet, useNavigate } from 'react-router-dom';
import ManagerSidebar from '../../Components/Dashboard/ManagerSidbar';
import ManagerNavbar from '../../Components/Dashboard/ManagerNavbar';
import './Manager.css';

const ManagerDashboard = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) {
        return <div>Loading ...</div>;
    }

    if (!user) {
        navigate('/login-page');
    }

    return (
       <div className="manager-dashboard">
            <ManagerSidebar className="manager-sidebar" />
            <div className="manager-navbar">
                <ManagerNavbar />
            </div>
            <div className="manager-dashboard-body">
                <Outlet className="manager-outlet" />
            </div>
        </div>

    );
};

export default ManagerDashboard;
