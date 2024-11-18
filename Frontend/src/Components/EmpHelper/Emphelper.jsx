import { useNavigate } from "react-router-dom"
import './EmpHelper.css'

export const columns = [
    {
        name:"S No",
        selector: (row) =>row.sno,
        sortable:true,
    },
    {
        name:"Employee Name",
        selector: (row) =>row.name,
        sortable: true,
    },
    {
        name:"Email",
        selector: (row) =>row.email,
    },
    {
        name:"Gender",
        selector: (row) =>row.gender,
    },
    {
        name:"Department",
        selector: (row) =>row.department,
    },
    {
        name:"Action",
        selector: (row) =>row.action,
        center:"true",
    }
]

export const EmployeeBtn = ({ Id}) => {
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        const confirm = window.confirm("Do you want to delete");
    
        if (confirm) {
            try {
                const response = await fetch(`http://localhost:3300/api/employee/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
    
                
                if (response.ok) {
                    alert("Employee deleted successfully.");
                    navigate('/manager-dashboard/employees');
                } else {
                    const data = await response.json();
                    console.error(data);
                    alert(data.message || "An error occurred");
                }
    
            } catch (error) {
                console.error("An error occurred while deleting the employee:", error);
            }
        }
    }
    
    
    return(
        <div className="btn-op">
            <button className="edit-btn"onClick={()=>navigate(`/manager-dashboard/employees/edit/${Id}`)}>
                Edit    
            </button>
            <button className="delete-btn"onClick={()=>handleDelete(Id)}
                >Delete    
            </button>
            <button className="delete-btn"onClick={()=>navigate(`/manager-dashboard/employees/leaves/${Id}`)}>
                Leave    
            </button>
        </div>
    )
}