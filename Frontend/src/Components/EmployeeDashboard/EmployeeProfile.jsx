import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./EmployeeProfile.css";

const EmployeeProfile = () => {
    const { id } = useParams(); 
    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEmployee = async () => {
        
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Authentication token not found');
          setLoading(false);
          return;
        }

        try {
          const response = await fetch(`http://localhost:3300/api/employee/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          
          const data = await response.json();
          if (response.ok && data.success) {
            setEmployee(data.employee);
          } else {
            console.error('Failed to fetch employee:', data.message);
          }
        } catch (error) {
          console.error('Error fetching employee data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchEmployee();
    }, [id]);
  
    if (loading) return <p>Loading...</p>;
  
    if (!employee) return <p>Employee not found.</p>;
  
    return (
      <div className='employee-profile-container'>
        <div className='profile-card'>
        <h2>{employee.name}'s Profile</h2>
        <p>Email: {employee.email}</p>
        <p>Employee ID: {employee.employeeId}</p>
        <p>Department: {employee.department}</p>
        <p>Gender: {employee.gender}</p>
        </div>
        
      </div>
    );
};

export default EmployeeProfile;
