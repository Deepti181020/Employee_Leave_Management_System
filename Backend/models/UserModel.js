const mongoose = require('mongoose');

//User Schema
const UserSchema = mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String,required:true,unique:true},
    password:{type:String, required:true},
    role: { type: String, enum: ['employee', 'manager'], required:true},

}, { timestamps: true });

module.exports = mongoose.model('User',UserSchema);