import React from "react";
import ToDoWrapper from "../ToDo/ToDoWrapper";
import TodoList from "../ToDo/TodoList";

function Home() {
  return (
    <div >
      <h3 className="text-2xl mt-10">Welcome to my To Do App</h3>
      <ToDoWrapper />
      {/* <TodoList /> */}
    </div>
  );
}

export default Home;
