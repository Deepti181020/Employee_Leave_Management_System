import React, { useEffect, useState } from 'react';
import './LeaveList.css';
import { Link, useParams } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';

const LeaveList = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  let sno = 1;
  const { id } = useParams();
  const { user } = useAuth();

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const response = await fetch(`http://localhost:3300/api/leave/${id}/${user.role}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();

        if (response.ok && data.success) {
          setLeaves(data.leaves);
        } else {
          console.error("Failed to fetch leaves:", data.message);
        }
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaves();
  }, [id, user.role]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='emp-list'>
      <div className='emp-manage'>
        <h3>Manage Leaves</h3>
      </div>
      {user.role === 'employee' && ( 
        <div className="emp-add">
          <Link to="/employee-dashboard/add-leaves" className='add-employee'>
            Add New Leave
          </Link>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>SNO</th>
            <th>Leave Type</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {leaves.length > 0 ? (
            leaves.map((leave) => (
              <tr key={leave._id}>
                <td data-label="SNO">{sno++}</td>
                <td data-label="Leave Type">{leave.leaveType}</td>
                <td data-label="From Date">
                  {new Date(leave.startDate).toLocaleDateString()}
                </td>
                <td data-label="To Date">
                  {new Date(leave.endDate).toLocaleDateString()}
                </td>
                <td data-label="Description">{leave.description}</td>
                <td data-label="Status">{leave.status}</td>
                <td data-label="Comments">
                  {leave.managerComments && leave.managerComments.trim() ? leave.managerComments : "No comments"}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No leaves found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveList;
