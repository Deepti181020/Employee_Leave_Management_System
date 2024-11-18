import React, { useEffect, useState } from 'react';
import './ManagerViewLeave.css';
import DataTable from 'react-data-table-component';
import { column, LeaveButton } from '../LeaveHelper/LeaveHelper';

const ManagerViewLeave = () => {
    const [leaves, setLeaves] = useState([]);
    const [filteredLeaves, setFilteredLeaves] = useState([]);

    const fetchLeaves = async () => {
        try {
            const response = await fetch('http://localhost:3300/api/leave', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const responseData = await response.json();
            if (response.ok) {
                let sno = 1;
                const data = responseData.leaves.map((leave) => ({
                    _id: leave._id,
                    sno: sno++,
                    employeeId: leave.employeeId?.employeeId || 'N/A',
                    name: leave.employeeId?.UserId?.name || 'Unknown',
                    leaveType: leave.leaveType,
                    department: leave.employeeId?.department || 'Unknown',
                    days:
                        leave.startDate && leave.endDate
                            ? Math.max(1, (new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 60 * 60 * 24))
                            : 'Invalid Dates',
                    startDate: new Date(leave.startDate).toLocaleDateString(),
                    endDate: new Date(leave.endDate).toLocaleDateString(),
                    status: leave.status,
                    managerComments: leave.managerComments || 'No Comments',
                    action: <LeaveButton Id={leave._id} />,
                }));
                setLeaves(data);
                setFilteredLeaves(data);
            } else {
                console.error('Error:', responseData.error);
            }
        } catch (error) {
            console.error('An error occurred while fetching the leaves:', error);
        }
    };

    useEffect(() => {
        fetchLeaves();
    }, []);

    const filterByInput = (e) => {
        const value = e.target.value.toLowerCase();
        const filtered = leaves.filter((leave) => {
            return Object.values(leave)
                .join(' ')
                .toLowerCase()
                .includes(value); 
        });
        setFilteredLeaves(filtered);
    };

    // Filter by button (status-specific filtering)
    const filterByButton = (status) => {
        const filtered = leaves.filter((leave) =>
            leave.status.toLowerCase() === status.toLowerCase()
        );
        setFilteredLeaves(filtered);
    };

    return (
        <>
            {filteredLeaves ? (
                <div className="view-leaves">
                    <div className="leaves-manage">
                        <h3>Manage Leaves</h3>
                    </div>

                    <div className="search-and-buttons">
                        <input
                            type="text"
                            placeholder="Search Leaves..."
                            onChange={filterByInput}
                            className="search-input"
                        />
                        <div className="leaves-btn">
                            <button onClick={() => filterByButton('Pending')}>Pending</button>
                            <button onClick={() => filterByButton('Approved')}>Approved</button>
                            <button onClick={() => filterByButton('Rejected')}>Rejected</button>
                        </div>
                    </div>

                    <div className="data-table">
                        <DataTable
                            columns={column}
                            data={filteredLeaves}
                            pagination
                            className="data-table-column"
                        />
                    </div>
                </div>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default ManagerViewLeave;
