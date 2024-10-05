import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ToDoWrapper from "./components/ToDo/ToDoWrapper.jsx";
import reportWebVitals from "./reportWebVitals.js";
import Layout from "./Layout.jsx";
import Home from "./components/Home/Home.jsx";
import TodoList from "./components/ToDo/TodoList.jsx";
import Login from "./components/Login/Login.jsx"
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";

function Main() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="todo" element={<ToDoWrapper />} />
        <Route path="todolist" element={<TodoList />} />
        <Route path="login" element={<Login />} />
      </Route>
    )
  );
  return (
    <React.StrictMode>
      <RouterProvider router={router}></RouterProvider>
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//        <ToDoWrapper/>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
