const Employee = require("../models/Employee")
const Leave = require("../models/Leave")

const getSummary = async (req,res) => {

    try {

        const totalEmployees = await Employee.countDocuments(); 

        const empAppliedForLeaves = await Leave.distinct('employeeId');
        const leaveStatus = await Leave.aggregate([
            {$group: {
                _id: "$status",
                count: {$sum: 1}
            }}
        ])

        const leaveSummary = {

            appliedFor: empAppliedForLeaves.length,
            approved:leaveStatus.find(item =>item._id === "Approved") ?.count || 0,
            rejected:leaveStatus.find(item =>item._id === "Rejected") ?.count || 0,
            pending:leaveStatus.find(item =>item._id === "Pending") ?.count || 0,

        }

        return res.status(200).json({success:true, totalEmployees, leaveSummary})


    } catch (error) {

        return res.status(500).json({success:false , error: " dashboard details error "})
        
    }
    
}

module.exports = {getSummary}