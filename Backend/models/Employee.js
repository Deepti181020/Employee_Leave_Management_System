const mongoose = require('mongoose');
const { Schema } = mongoose;
// The schema for Employee

const employeeSchema = new mongoose.Schema({
    UserId:{
        type:Schema.Types.ObjectId,
        ref:"User" , 
        required:true,
        },
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    gender: {
        type: String,
    },
    department: {
        type: String,
        required: true,
    },


},{ timestamps: true });

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
