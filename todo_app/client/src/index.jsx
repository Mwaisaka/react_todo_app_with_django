// import React , {useState} from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import ToDoWrapper from "./components/ToDo/ToDoWrapper.jsx";
// import reportWebVitals from "./reportWebVitals.js";
// import Layout from "./Layout.jsx";
// import Home from "./components/Home/Home.jsx";
// import TodoList from "./components/ToDo/TodoList.jsx";
// import Login from "./components/Login/Login.jsx"
// import Header from "./components/Header/Header.jsx";
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   RouterProvider,
//   Route,
// } from "react-router-dom";

// function Main() {

//   const [user, setUser] = useState(null);

//   // Handle login
//   const handleLogin = (userData) => {
//     setUser(userData);
//   };

//   // Handle logout
//   const handleLogout = () => {
//     setUser(null);
//   };

//   const router = createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         {/* <Route path="/" element={<Home />} /> */}
//         <Route path="todo" element={<ToDoWrapper />} />
//         <Route path="todolist" element={<TodoList />} />
//         <Route path="login" element={<Login onLogin={handleLogin} />} />
//       </Route>
//     )
//   );
//   return (
//     <React.StrictMode>
//       <Header user={user} onLogout={handleLogout} />
//       <RouterProvider router={router}></RouterProvider>
//     </React.StrictMode>
//   );
// }

// ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
// // const root = ReactDOM.createRoot(document.getElementById('root'));
// // root.render(
// //   <React.StrictMode>
// //        <ToDoWrapper/>
// //   </React.StrictMode>
// // );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

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
