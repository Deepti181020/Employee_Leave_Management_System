import React, { useState } from 'react'
import './AddLeave.css'
import { useAuth } from '../../Context/authContext'
import { useNavigate } from 'react-router-dom';



const AddLeave = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const[leave,setLeaave] = useState({
        UserId: user._id,
    })

    const [successMessage, setSuccessMessage] = useState(null); 
    const [errorMessage, setErrorMessage] = useState(null); 
    const handleChange = (e) => {
        const {name , value } = e.target;

        setLeaave((prevState)=>({...prevState, [name]: value}));

    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        if (new Date(leave.startDate) > new Date(leave.endDate)) {
            alert("End Date cannot be earlier than Start Date.");
            return;
        }

        try {
            console.log(leave);
            
            const response = await fetch("http://localhost:3300/api/leave/add", {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify(leave), 
            });
            if (!response.ok) {
              const errorData = await response.json();
              console.error("Failed to add employee:", errorData.message || response.statusText);
            }
      
            if (response.ok) {
                setSuccessMessage('Leave added successfully!');
                setErrorMessage(null);
                navigate(`/employee-dashboard/leaves/${user._id}`);
            } else {
                setSuccessMessage(null);
                setErrorMessage(errorData.message || 'Failed to add leave');

              console.error("Failed to add employee:", response.statusText);
            }
          } catch (error) {
            setSuccessMessage(null); 
            setErrorMessage('An error occurred while adding leave');
            console.error("An error occurred while adding the employee:", error);
          }

    }
    return (
        <div className='add-leave-form'>
            <h2>Request for Leave</h2>
             
            {successMessage && <div className="success-message">{successMessage}</div>}
            {errorMessage && <div className="error-message">{errorMessage}</div>}


            <form onSubmit={handleSubmit}>
                <div className="leave-form">

                    <div className="leave-form-items">
                        <label >Select Leave Type</label>
                        <select name="leaveType" onChange={handleChange} required >
                            <option value="">Select</option>
                            <option value="annual leave">Annual Leave</option>
                            <option value="sick leave">Sick Leave</option>
                            <option value="casual leave">Casual Leave</option>
                            <option value="maternity leave">Maternity Leave</option>
                        </select>
                    </div>

                    <div className="leave-form-items">
                        <label>From Date</label>
                        <input type="date" name='startDate' onChange={handleChange} required />
                    </div>
                    <div className="leave-form-items">
                        <label>To Date</label>
                        <input type="date" name='endDate' onChange={handleChange} required />
                    </div>


                    <div className="leave-form-items">
                        <label>Reason</label>
                        <textarea
                            name="description"
                            rows="5"
                            placeholder="Enter description..."
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="leave-btn">
                        <button type="submit">Add New Leave</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default AddLeave
