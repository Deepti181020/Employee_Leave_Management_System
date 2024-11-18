import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import DataTable from "react-data-table-component"
import "./EmployeeList.css"
import { columns, EmployeeBtn } from '../EmpHelper/Emphelper'

const EmployeeList = () => {

  const [employees, setEmployees] = useState([]);
  const [emplLoading, setEmpLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setEmpLoading(true);
      try {
        const response = await fetch("http://localhost:3300/api/employee", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const responseData = await response.json();
  
        if (response.ok) {
          let sno = 1;
          const employeesData = responseData.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            name: emp.UserId.name,
            email: emp.UserId.email,
            gender: emp.gender,
            department: emp.department,
            action: (<EmployeeBtn Id={emp._id} />),
          }));
          setEmployees(employeesData);
        } else {
          console.error("Error:", responseData.error);
        }
  
      } catch (error) {
        console.error("An error occurred while fetching the employee:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
  
    fetchEmployees();
  }, []);
  

  return (
    <div className='emp-list'>
      <div className='emp-manage'>
        <h3>Manage Employee</h3>
      </div>
      <div className="emp-add">
        <Link to="/manager-dashboard/add-employee" className='add-employee'>
          Add New Employee
        </Link>
      </div>
      <div className='employee-list'>
        <DataTable columns={columns} data={employees} pagination className='table'/>
      </div>
    </div>
  )
}

export default EmployeeList
