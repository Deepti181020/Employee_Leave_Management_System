const express = require('express');
const Authmidleware = require('../Middleware/AuthMidleware');
const {addEmployee, getEmployeeById, editEmployee, deleteEmployee} = require('../Controllers/employeeController')
const {getEmployees} = require('../Controllers/employeeController');
const route = express.Router();
route.get('/',Authmidleware,getEmployees)
route.post('/add',Authmidleware,addEmployee)
route.get('/:id', Authmidleware, getEmployeeById);
route.put('/:id', Authmidleware, editEmployee); 
route.delete('/:id',Authmidleware,deleteEmployee);


module.exports = route;