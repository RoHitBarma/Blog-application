import { Outlet } from "react-router-dom";
import DashboardNavbar from "../pages/Dashboard/DashboardNavbar";
import Sidebar from "../pages/Dashboard/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Dashboard Header */}
      <Sidebar />


      <div className="flex-1">
        <DashboardNavbar />

        {/* Dashboard Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
