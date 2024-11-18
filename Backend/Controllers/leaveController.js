
const Employee = require('../models/Employee');
const Leave = require('../models/Leave');

//Add leave by the employee
const addLeave = async (req,res) => {
    const { UserId,leaveType,startDate,endDate,description } = req.body;
    try {

        console.log("Request Body:", req.body);

        const employee = await Employee.findOne({UserId})
        const newLeave = new Leave({employeeId: employee._id,
            leaveType,
            startDate,
            endDate,
            description
        });

         await newLeave.save();

       return  res.status(200).json({ success: true, message: 'Leave created successfully!' });
    } catch (error) {
        console.error('Error creating leave:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


//Get the leave details by id
const getLeave = async (req,res) => {
    try {
        const { id, role } = req.params;
        let leaves ;
        if(role === "manager")
        {
            leaves = await Leave.find({employeeId: id})

        }else{
            const employee = await Employee.findOne({UserId: id})
            leaves = await Leave.find({employeeId: employee._id})
        }   
            console.log('Leaves:', leaves);
        
        return  res.status(200).json({ success: true, leaves});
    } catch (error) {
        console.error('Error fteching leave details:', error);
        res.status(500).json({ success: false, message: error.message });
    }
    
}

//Get the leave list
const getLeaves = async (req, res) => {

     try {
        const leaves = await Leave.find().populate({
            path: "employeeId",
            populate:[
                {
                    path:'UserId',
                    select: 'name'
                }
            ]
        })

        return  res.status(200).json({ success: true, leaves });
    
    } catch (error) {

        console.error('Error fteching leave details:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}

//Get the leave detail

const getLeaveDetail = async (req,res) => {

    try {
        const { id } = req.params;
        const leave = await Leave.findById({_id: id}).populate({
            path: "employeeId",
            populate:[
                {
                    path:'UserId',
                    select: 'name'
                }
            ]
        })

        return  res.status(200).json({ success: true, leave });
    
    } catch (error) {

        console.error('Error fteching leave details:', error);
        res.status(500).json({ success: false, message: error.message });
    }
}


//Update Detail
const updateLeave = async (req, res) => {
    try {
        const { id } = req.params;
        const { status,managerComments } = req.body;

        console.log({status,managerComments});

        const leave = await Leave.findByIdAndUpdate(
            id, 
            { status: status,
                managerComments 
             }, 
            { new: true } 
        );

        if (!leave) {
            return res.status(404).json({ success: false, error: "Leave not found" });
        }

        return res.status(200).json({ success: true, leave });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ success: false, error: "Leave status server error" });
    }
};


module.exports ={ addLeave ,getLeave,getLeaves,getLeaveDetail,updateLeave } 