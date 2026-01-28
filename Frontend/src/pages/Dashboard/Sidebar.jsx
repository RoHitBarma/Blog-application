import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-white h-screen shadow-md p-5">
      <h2 className="text-xl font-bold mb-6">✍ Expressly</h2>

      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-indigo-600 text-white" : "text-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/dashboard/posts/new"
          className={({ isActive }) =>
            `px-4 py-2 rounded ${
              isActive ? "bg-indigo-600 text-white" : "text-gray-700"
            }`
          }
        >
          Create Post
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
