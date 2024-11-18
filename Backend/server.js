const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
require ('dotenv').config();
const authRouter = require('./routes/auth');
const employeeRouter = require('./routes/employee');
const leaveRouter = require('./routes/leaves');
const dashboardManagerRouter = require('./routes/dashboardmanager')

const app = express();
app.use(cors());
app.use(express.json());


app.use('/api/auth',authRouter);
app.use('/api/employee',employeeRouter);
app.use('/api/leave',leaveRouter);
app.use('/api/dashboard',dashboardManagerRouter);

//Connect the database
mongoose.connect(process.env.DATABASE)
.then(()=>{
    console.log("Mongodb is connected");
    managerRegister();
})
.catch((error)=>console.log("MongoDB connection error",error));


const User = require('./models/UserModel');

const managerRegister = async () => {
    try {
        const hashPassword = await bcrypt.hash("manager123", 10);
        const newUser = new User({
            name: "Manager",
            email: "manager@gmail.com",
            password: hashPassword,
            role: "manager"
        });

        const existingManager = await User.findOne({ email: newUser.email });
        if (!existingManager) {
            await newUser.save();
            console.log("Manager registered successfully");
        } else {
            console.log("Manager already exists");
        }
    } catch (error) {
        console.log("Error registering manager:", error);
    }
};

app.listen(process.env.PORT,(error)=>{
    if(!error){
        console.log(`Server is running on port : ${process.env.PORT}`);
    }
    else{
        console.log("Error" + error);    
    }
})