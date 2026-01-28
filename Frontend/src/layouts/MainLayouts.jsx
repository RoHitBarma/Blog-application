import { Outlet } from "react-router-dom";
import Navbar from "../components/Layouts/Navbar";
import Footer from "../components/Layouts/Footer";

const MainLayouts = ({ showFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayouts;
