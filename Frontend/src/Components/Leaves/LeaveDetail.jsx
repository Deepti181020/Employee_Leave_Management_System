import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './LeaveDetail.css';

const LeaveDetail = () => {
    const { id } = useParams();
    const [leave, setLeave] = useState(null);
    const [comment, setComment] = useState(''); 
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLeave = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('Authentication token not found');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:3300/api/leave/detail/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await response.json();
                if (response.ok && data.success) {
                    setLeave(data.leave);
                } else {
                    console.error('Failed to fetch leave:', data.message);
                }
            } catch (error) {
                console.error('Error fetching leave data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLeave();
    }, [id]);

    const changeStatus = async (status) => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Authentication token not found');
            return;
        }

        try {
            const response = await fetch(`http://localhost:3300/api/leave/${leave._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ status, managerComments: comment }),
            });

            const data = await response.json();
            if (response.ok && data.success) {
                console.log('Leave status updated successfully');
                navigate('/manager-dashboard/leaves'); 
            } else {
                console.error('Failed to update leave status:', data.message);
            }
        } catch (error) {
            console.error('Error updating leave status:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    if (!leave) return <p>Leave not found.</p>;

    return (
        <div className="leave-detail">
            <h2>Leave Detail</h2>
            <div className="leave-detail-items">
                <p>Name: {leave.employeeId.UserId.name}</p>
                <p>Employee ID: {leave.employeeId.employeeId}</p>
                <p>Leave Type: {leave.leaveType}</p>
                <p>Reason: {leave.description}</p>
                <p>Department: {leave.employeeId.department}</p>
                <p>Start Date: {new Date(leave.startDate).toLocaleDateString()}</p>
                <p>End Date: {new Date(leave.endDate).toLocaleDateString()}</p>

                <p>{leave.status === 'Pending' ? 'Action' : 'Status'}</p>

                {leave.status === 'Pending' ? (
                    <div>
                        <div className="leave-pending-btn">
                            <button onClick={() => changeStatus("Approved")}>Approve</button>
                            <button onClick={() => changeStatus("Rejected")}>Reject</button>
                        </div>
                        <textarea
                            placeholder="Add a comment (optional)"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={3}
                            style={{ marginTop: '10px', width: '100%' }}
                        />
                    </div>
                ) : (
                    <>
                        <p>Status: {leave.status}</p>
                        {leave.managerComments && <p>Comments: {leave.managerComments}</p>}
                    </>
                )}
            </div>
        </div>
    );
};

export default LeaveDetail;
