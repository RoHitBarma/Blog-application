import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'

const DashboardNavbar = () => {
  const navigate = useNavigate()
  const {user, logout} = useContext(AuthContext)

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  return (
    <div className='bg-white shadow px-6 py-4 flex justify-between items-center'>
        <h1 className='text-xl font-bold'>Dashboard</h1>

        <div className="flex items-center gap-4">
            {/* <span>
                👋{user?.name || "User"}
            </span>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600"
            >
                Logout
            </button> */}

            {user ? (
                <div className="flex items-center gap-3">
                    {/* Profile Pic */}
                    <img
                    src={user.profilePic}
                    alt={user.username}
                    className="w-9 h-9 rounded-full object-cover border"
                    />

                    {/* Username */}
                    <span className="text-sm font-medium text-gray-800">
                    {user.username}
                    </span>

                    {/* Logout */}
                    <button
                    onClick={logout}
                    className="text-sm text-red-500 hover:underline"
                    >
                    Logout
                    </button>
                </div>
                ) : (
                <div className="flex gap-4">
                    <button onClick={() => navigate("/login")}>Login</button>
                    <button onClick={() => navigate("/register")}>Register</button>
                </div>
            )}

        </div>
    </div>
  )
}

export default DashboardNavbar