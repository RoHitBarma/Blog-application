// import { Routes, Route, Navigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard/Dashboard";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />

//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

      
//         <Route path="/dashboard" element={<Dashboard />} />
      

//       {/* fallback */}
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//   );
// }

// export default App;





import './App.css'
import { Routes, Route } from "react-router-dom"

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'

import Dashboard from './pages/Dashboard/Dashboard'
import CreatePost from './pages/Dashboard/CreatePost'
import PostDetails from './pages/Dashboard/PostDetails'
import EditPost from './pages/Dashboard/EditPost'

import ProtectedRoute from './routes/ProtectedRoute'
import MainLayout from './layouts/MainLayouts'
import DashboardLayout from './layouts/DashboardLayout'

function App() {
  return (
    <Routes>

      {/* 🌐 Public Routes */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔐 Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/posts/new" element={<CreatePost />} />
          <Route path="/dashboard/posts/:id" element={<PostDetails />} />
          <Route path="/dashboard/posts/:id/edit" element={<EditPost />} />
        </Route>

    </Routes>
  )
}

export default App




// import { Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import Dashboard from "./pages/Dashboard/Dashboard";
// import CreatePost from "./pages/Dashboard/CreatePost";
// import PostDetails from "./pages/Dashboard/PostDetails";
// import EditPost from "./pages/Dashboard/EditPost";

// import ProtectedRoute from "./routes/ProtectedRoute";
// import MainLayout from "./layouts/MainLayouts";

// function App() {
//   return (
//     <Routes>
//       {/* 🌐 Public Routes */}
//       <Route element={<MainLayout />}>
//         <Route path="/" element={<Home />} />
//       </Route>

//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />

//       {/* 🔐 Protected Routes */}
//       <Route
//         element={
//           <ProtectedRoute>
//             <MainLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/posts/new" element={<CreatePost />} />
//         <Route path="/posts/:id" element={<PostDetails />} />
//         <Route path="/posts/:id/edit" element={<EditPost />} />
//       </Route>
//     </Routes>
//   );
// }

// export default App;
