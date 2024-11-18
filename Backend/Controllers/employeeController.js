const Employee = require('../models/Employee')
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

// To store the user data 
const addEmployee = async (req, res) => {
    const { name, email, password, role, employeeId, gender, department } = req.body;
    try {

        console.log("Request Body:", req.body);
        const hashedPassword = await bcrypt.hash(password,10);

        const user = new User({ name, email, password: hashedPassword, role });
        const savedUser = await user.save();

        const employee = new Employee({
            UserId: savedUser._id,
            name,
            email,
            password:hashedPassword,
            employeeId,
            gender,
            department,
            role,
        });

        await employee.save();
        res.status(201).json({ success: true, message: 'Employee created successfully!' });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//Get user details
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find().populate('UserId',{password: 0});
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        console.error("Error in getEmployees:", error.message); // Log error details
        return res.status(500).json({ success: false, error: "Get employees server error" });
    }
};


//GetEmployee by id
const getEmployeeById = async (req, res) => {
    
    //UserId
    const { id } = req.params; 
    try {

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid Employee ID format' });
        }
        
        let employee = await Employee.findById(id).populate('UserId',{password: 0});  
        if (!employee) {
             employee = await Employee.findOne({UserId: id}).populate("UserId")
        }

        return res.status(200).json({ success: true, employee });
    } catch (error) {
        console.error("Error fetching employee:", error.message);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};


//Edit the employee
const editEmployee = async (req, res) => {
    const { id } = req.params;
    const { name, email, employeeId, gender, department, role } = req.body;

    try {
        const employee = await Employee.findById({_id:id})
        if (!employee) {
            return res.status(404).json({ success: false, message: 'Employee not found' });
        }
        const user = await User.findById({_id:employee.UserId})
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const EditUser =  await User.findByIdAndUpdate({_id:employee.UserId},{name,email,role})

        const EditEmployee =  await Employee.findByIdAndUpdate({_id:id},{employeeId,gender,department})
        if(!EditUser || !EditEmployee){
            return res.status(404).json({ success: false, message: 'Data not found' });
        }

        return res.status(200).json({ success: true, message: 'Data Updated' });


    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ success: false, message: 'Server error while updating employee and user' });
    }
};


//Delete the employee
const deleteEmployee = async (req, res) => {
    const { id } = req.params;
  
    try {
      
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid Employee ID format' });
      }
  
      const employee = await Employee.findById({_id:id});
  
      if (!employee) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
  
      const userId = employee.UserId;
      const user = await User.findById({_id:employee.UserId})
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
  
      const userDeletion = await User.findByIdAndDelete({_id:employee.UserId});
      if (!userDeletion) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const employeeDeletion = await Employee.findByIdAndDelete({_id:id});
      if (!employeeDeletion) {
        return res.status(404).json({ success: false, message: 'Employee not found' });
      }
  
      return res.status(200).json({ success: true, message: 'Employee and associated user deleted successfully' });
      
    } catch (error) {
      console.error('Error deleting employee:', error.message);
      return res.status(500).json({ success: false, message: 'Server error' });
    }
  };
  module.exports = { addEmployee ,getEmployees,getEmployeeById,editEmployee,deleteEmployee};    