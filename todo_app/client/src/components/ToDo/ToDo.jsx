import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ToDo({ task, deleteTodo, editTodo, toggleComplete }) {
  return (
    <div className="ToDo flex items-center justify-between mb-4 transform transition duration-300 ease-in-out hover:scale-105 bg-red-100 rounded-lg p-2">
      <div className="flex items-center w-full">
        <input
          type="checkbox"
          className="mr-3 rounded-none h-4 w-4"
          checked={task.completed}
          onChange={() => toggleComplete(task.id)}
        />
        <p
          className={`${task.completed ? "completed" : ""} flex-grow`}
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
          className="cursor-pointer hover:text-blue-500"
        />
      </div>
    </div>
  );
}

export default ToDo;
