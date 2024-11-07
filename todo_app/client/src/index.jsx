import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToDoWrapper from "./components/ToDo/ToDoWrapper.jsx";
import reportWebVitals from "./reportWebVitals.js";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
// import TodoList from "./components/ToDo/TodoList.jsx";
import Login from "./components/Login/Login.jsx";
import ResetPassword from "./components/Login/ResetPassword.jsx";
import UserRegistration from "./components/Login/UserRegistration.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  // useNavigate,
} from "react-router-dom";

function Main() {
  const [user, setUser] = useState(null);
  // const navigate = useNavigate();

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    console.log("User has been logged in successfully:", userData.subscriber.fullname);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    console.log("User logged out successfully");
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout user={user} onLogout={handleLogout} />}>
        <Route index element={<Home />} />
        <Route
          path="todo"
          element={
            user ? (
              <ToDoWrapper onLogout={handleLogout} user={user}/>
            ) : (
              <Login onLogin={handleLogin}/>
            )
          }
        />
        {/* <Route path="todolist" element={<TodoList />} /> */}
        <Route
          path="login"
          element={
            <div>
              <Login onLogin={handleLogin} user={user} />
            </div>
          }
        />

        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="user-registration" element={<UserRegistration />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
      {/* The router wraps all components */}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

reportWebVitals();
