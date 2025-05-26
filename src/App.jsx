import React, { Profiler, useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import ManageTasks from './pages/Admin/ManageTasks';
import CreateTask from './pages/Admin/CreateTask';
import ManageUsers from './pages/Admin/ManageUsers';
import UserDashboard from './pages/User/UserDashboard';
import MyTasks from './pages/User/MyTasks';
import ViewTaskDetails from './pages/User/ViewTaskDetails';
import UserProvider, { UserContext } from './context/userContext';
import { Toaster } from 'react-hot-toast';
import Profile from './pages/User/Profile';
import LandingPage from './pages/LandingPage';
import ThemeProvider from './context/ThemeContext';


const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <div>
          <Router>
            <Routes>
              <Route path='/' element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
              <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />

              {/* Admin Routes */}
              <Route element={<PrivateRoute allowedRoles={["admin"]} />} >
                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/tasks" element={<ManageTasks />} />
                <Route path="/admin/create-task" element={<CreateTask />} />
                <Route path="/admin/users" element={<ManageUsers />} />
              </Route>

              {/* User Routes */}
              <Route element={<PrivateRoute allowedRoles={["admin"]} />} >
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/tasks" element={<MyTasks />} />
                <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
                <Route path="/user/userProfile" element={<Profile />} />
              </Route>

              {/* Default Route */}
              <Route path='/' element={<Root />} />
            </Routes>
          </Router>
        </div>
        <Toaster toastOptions={{
          className: "",
          style: { fontSize: "13px", }
        }} />
      </UserProvider>
    </ThemeProvider>
  )
}

export default App

const Root = () => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <Outlet />

  if (!user) {
    return <Navigate to="/login" />;
  }

  return user.role === "admin" ? <Navigate to="/admin/dashboard" /> : <Navigate to="/user/dashboard" />;
}