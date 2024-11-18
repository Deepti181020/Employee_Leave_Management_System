import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/UserLogin";
import ManagerDashboard from "./Pages/ManagerDashboard/ManagerDashboard";
import PrivateRoutes from "./Pages/utils/PrivateRoutes.jsx"
import RoleRoutes from "./Pages/utils/RoleRoutes"
import DashboardDesc from "./Components/Dashboard/DashboardDesc.jsx";
import EmployeeList from "./Components/Employee/EmployeeList.jsx";
import AddEmployee from "./Components/Employee/AddEmployee.jsx"
import EditEmployee from "./Components/Employee/EditEmployee.jsx";
import EmpDashBoard from "./Pages/EmpDashboard/EmpDashBoard.jsx";
import EmployeeCard from "./Components/EmployeeDashboard/EmployeeCard.jsx";
import EmployeeProfile from "./Components/EmployeeDashboard/EmployeeProfile.jsx";
import LeaveList from "./Components/Leaves/LeaveList.jsx";
import AddLeave from "./Components/Leaves/AddLeave.jsx";
import ManagerViewLeave from "./Components/Leaves/ManagerViewLeave.jsx";
import LeaveDetail from "./Components/Leaves/LeaveDetail.jsx";

const App = () => {
  return (

    <Routes>
      {/* Login route*/}

      <Route path="/" element={<Navigate to="/manager-dashboard" />}></Route>
      <Route path="/login-page" element={<Login />}></Route>

      {/* manager routes */}

      <Route path="/manager-dashboard" element={
        <PrivateRoutes>
          <RoleRoutes requiredRole={["manager"]}>
            <ManagerDashboard />
          </RoleRoutes>
        </PrivateRoutes>
      }>

        <Route index element={<DashboardDesc />} ></Route>
        <Route path="/manager-dashboard/employees" element={<EmployeeList />} ></Route>
        <Route path="/manager-dashboard/add-employee" element={<AddEmployee />} ></Route>
        <Route path="/manager-dashboard/employees/edit/:id" element={<EditEmployee />} ></Route>
        <Route path="/manager-dashboard/leaves" element={<ManagerViewLeave />} ></Route>
        <Route path="/manager-dashboard/leaves/:id" element={<LeaveDetail />} ></Route>
        <Route path="/manager-dashboard/employees/leaves/:id" element={<LeaveList />} ></Route>


      </Route>
      {/* Employee Routes */}
      <Route path="/employee-dashboard" element={<PrivateRoutes>
        <RoleRoutes requiredRole={["manager", "employee"]}>
          <EmpDashBoard />
        </RoleRoutes>
      </PrivateRoutes>
      }>
        <Route index element={<EmployeeCard />}></Route>
        <Route path="/employee-dashboard/profile/:id" element={<EmployeeProfile />}></Route>
        <Route path="/employee-dashboard/leaves/:id" element={<LeaveList />} />
        <Route path="/employee-dashboard/add-leaves" element={<AddLeave />}></Route>
      </Route>

    </Routes>


  )
}

export default App
