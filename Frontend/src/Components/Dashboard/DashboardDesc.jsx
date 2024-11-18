import React, { useEffect, useState } from 'react'
import './DashboardDesc.css'
import DashboardCard from './DashboardCard'
import { FaCheckCircle, FaFileAlt, FaHourglassHalf, FaTimesCircle, FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const DashboardDesc = () => {
    const [summary,setSummary] = useState(null);

    useEffect (()=>{
        

        const fetchSummary = async () => {
            try {
                const response = await fetch("http://localhost:3300/api/dashboard/summary", {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  });

                  const data = await response.json();

                  setSummary(data);
                
            } catch (error) {
                if(error.response){
                    alert(error.response.data.error);
                }
                console.log(error.message);   
            }
            
        }
        fetchSummary();
    },[]);

    if(!summary){
        return <div>Loading ...</div>
    }
    return (
        <div className='manager-description'>
            <h3 className='manager-dashboard-overview'>Dashboard Overview</h3>
            <div className='manage-desc-overview'>
                    <Link to="/manager-dashboard/employees"  className="dashboard-link">
                        <DashboardCard 
                            icon={<FaUsers />} 
                            text="Total Employees" 
                            number={summary.totalEmployees} 
                    />
                </Link>
            </div>
            <div className='manager-leave-details'>
                <h3>Leave Details</h3>
                <div className="manager-leave-menu">
                    <div className='manager-leave-menu-items'>
                        <DashboardCard icon={<FaFileAlt />} text="Leave Applied" number={summary.leaveSummary.appliedFor} className="menu-items" />
                    </div>
                    <div className='manager-leave-menu-items'>
                        <DashboardCard icon={<FaCheckCircle />} text="Leave Approved" number={summary.leaveSummary.approved} className="menu-items" />

                    </div>
                    <div className='manager-leave-menu-items'>
                        <DashboardCard icon={<FaHourglassHalf />} text="Leave Pending" number={summary.leaveSummary.pending} className="menu-items" />

                    </div>
                    <div className='manager-leave-menu-items'>
                        <DashboardCard icon={<FaTimesCircle />} text="Leave Rejected" number={summary.leaveSummary.rejected} className="menu-items" />

                    </div>
                </div>
            </div>

        </div>
    )
}

export default DashboardDesc
