import React, { useState } from 'react';
import './AddEmployee.css';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    employeeId: '',
    gender: '',
    department: '',
    role: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(formData);
      
      const response = await fetch("http://localhost:3300/api/employee/add", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData), 
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Failed to add employee:", errorData.message || response.statusText);
      }

      if (response.ok) {
        navigate("/manager-dashboard/employees");
      } else {
        console.error("Failed to add employee:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while adding the employee:", error);
    }
  };

  return (
    <div className='emp-add-form'>
      <h2>Add New Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="emp-form">
          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Employee Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Employee Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Employee Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Employee ID</label>
            <input
              type="text"
              name="employeeId"
              placeholder="Employee ID"
              value={formData.employeeId}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label>Department</label>
            <select name="department" value={formData.department} onChange={handleChange} required>
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
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="manager">Manager</option>
              <option value="employee">Employee</option>
            </select>
          </div>
        </div>
        <div className="form-btn">
          <button type="submit">Add New Employee</button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
