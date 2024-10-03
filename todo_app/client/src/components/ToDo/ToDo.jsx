import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ToDo({ task, deleteTodo, editTodo, toggleComplete }) {
  return (
    <div className="bg-red">
      <div className="ToDo flex items-center justify-between mb-4 transform transition duration-300 ease-in-out hover:scale-105">
        <div className=" flex items-center pt-3">
          <input
            type="checkbox"
            className="mr-3 rounded-none h-4 w-4 mb-5"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
          />
          <p
            className={`${task.completed ? "completed" : ""}`}
            onClick={() => toggleComplete(task.id)}
          >
            {task.task}
          </p>
        </div>

        <div className="flex space-x-3">
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => editTodo(task.id)}
            className="cursor-pointer hover:text-blue-500"
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => deleteTodo(task.id)}
            className="cursor-pointer  hover:text-blue-500"
          />
        </div>
      </div>
    </div>
  );
}

export default ToDo;
