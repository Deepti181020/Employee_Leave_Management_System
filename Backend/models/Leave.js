const mongoose = require('mongoose');

//The Leave Schema
const leaveSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Employee",
    required: true, 
  },
  leaveType: {
    type: String,
    required: true,
    enum: ['annual leave', 'sick leave', 'casual leave', 'maternity leave'], 
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxlength: 500,
  },
  status: {
    type: String,
    enum: ["Pending","Approved","Rejected"],
    default: "Pending",
  },
  managerComments: { type: String ,
  },
 
},{ timestamps: true });

module.exports = mongoose.model('Leave', leaveSchema);
