import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToDoWrapper from "./components/ToDo/ToDoWrapper.jsx";
import reportWebVitals from "./reportWebVitals.js";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
// import TodoList from "./components/ToDo/TodoList.jsx";
import Login from "./components/Login/Login.jsx";
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
  const handleLogin = (user) => {
    setUser(user);
    console.log("User logged in successfully:", user);
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    console.log("User logged out successfully")
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout user={user} onLogout={handleLogout}/>}>
        <Route index element={<Home />} />
        <Route
          path="todo"
          element={user ? <ToDoWrapper onLogout={handleLogout}/> : <Login onLogin={handleLogin} />}
        />
        {/* <Route path="todolist" element={<TodoList />} /> */}
        <Route path="login" element={<Login onLogin={handleLogin} />} />
      </Route>
    )
  );

  return (
    <React.StrictMode>
      <RouterProvider router={router}>
      </RouterProvider>
      {/* The router wraps all components */}
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);

reportWebVitals();
