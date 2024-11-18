import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditEmployee.css'

const EditEmployee = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();

  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    employeeId: '',
    gender: '',
    department: '',
    role: '',
  });

  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const fetchEmployee = async () => {
        try {
          const response = await fetch(`http://localhost:3300/api/employee/${id}`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log(data); 
      
            if (data && data.success) {
              const employee = data.employee; 
      
              setEmployeeData({
                name: employee.UserId.name, 
                email: employee.email,
                employeeId: employee.employeeId,
                gender: employee.gender,
                department: employee.department,
                role: employee.role,
              });
            } else {
              console.error("Failed to fetch employee data:", data.message || "Unknown error");
            }
          } else {
            console.error("Failed to fetch employee data:", response.statusText);
          }
        } catch (error) {
          console.error("An error occurred while fetching the employee:", error);
        } finally {
          setIsLoading(false); 
        }
      };
      

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevEmployeeData) => ({
      ...prevEmployeeData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3300/api/employee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(employeeData),
      });

      if (response.ok) {
        navigate("/manager-dashboard/employees"); 
      } else {
        console.error("Failed to update employee:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while updating the employee:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="emp-edit-form">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="emp-form">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={employeeData.employeeId}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Gender</label>
            <select
              name="gender"
              value={employeeData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
          <div>
            <label>Department</label>
            <select
              name="department"
              value={employeeData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="development">Development</option>
              <option value="engineering">Engineering</option>
              <option value="product-management">Product Management</option>
              <option value="marketing">Marketing</option>
              <option value="hr">HR</option>
            </select>
          </div>
          <div>
            <label>Role</label>
            <select
              name="role"
              value={employeeData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>
        <div className="form-btn">
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
