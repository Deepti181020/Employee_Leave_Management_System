import React from 'react'
import { useNavigate } from 'react-router-dom'
import './LeaveHelper.css'
export const column = [
    {
        name:"S No",
        selector: (row) =>row.sno,
        sortable:true,
    },
    {
        name:"Emp_Id",
        selector: (row) =>row.employeeId,
    },
    {
        name:"Emp_Name",
        selector: (row) =>row.name,
        sortable: true,
    },
    {
        name:"Leave Type",
        selector: (row) =>row.leaveType,
    },
    {
        name:"Deps",
        selector: (row) =>row.department,
    },
    {
        name:"Days",
        selector: (row) =>row.days,
    },
    {
        name:"Start Date",
        selector: (row) =>row.startDate,
    },
    {
        name:"End Date",
        selector: (row) =>row.endDate,
    },
    {
        name:"Status",
        selector: (row) =>row.status,
    },
    {
        name:"Comment",
        selector: (row) =>row.managerComments,
    },
    
    {
        name:"Action",
        selector: (row) =>row.action,
        center:"true",
    },
    
]

export const LeaveButton = ({Id}) =>{
    const navigate = useNavigate();

    const handleView = (id) =>{
        navigate(`/manager-dashboard/leaves/${id}`)
    }

  return (
    <div>
         <button className="view-leave-btn"onClick={()=>handleView(Id)}
                >View   
            </button>
    </div>
    )
};
