import React from "react";
import ToDoWrapper from "../ToDo/ToDoWrapper";

function Home() {
  return (
    <div >
      <h3 className="text-2xl mt-10">Welcome to my To Do App</h3>
      <ToDoWrapper />
    </div>
  );
}

export default Home;
