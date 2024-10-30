import React, { useState, useEffect } from "react";
import ToDoForm from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import EditToDoForm from "./EditToDoForm";
import ToDo from "./ToDo";
import "./ToDoList.css";
import ToDoApp1 from "../Images/ToDoApp1.png";

function ToDoWrapper({ onLogout }) {
  const [todos, setToDos] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/tasks/")
      .then((res) => res.json())
      .then(setToDos);
  }, []);

  console.log("Tasks", todos);

  const addToDo = (todo) => {
    setToDos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = async (id) => {
    //Ask for the user confirmation before deleting the task
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (confirmDelete) {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/tasks/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          setToDos(todos.filter((todo) => todo.id !== id));
          alert("Task deleted successfully");
        }
        if (response.status === 404) {
          throw new Error("Task not found");
        }
      } catch (err) {
        console.log(err.message);
        alert(err.message);
      }
    } else {
      //If the user cancels the deletion, do nothing
      alert("Task deletion cancelled.");
    }
  };

  const toggleComplete = async (id) => {
    // Find the task to toggle
    const taskToToggle = todos.find((todo) => todo.id === id);
    if (!taskToToggle) return;

    const updatedCompletionStatus = !taskToToggle.completed;

    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/edit/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: updatedCompletionStatus }),
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setToDos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, ...updatedTask } : todo
          )
        );
      } else {
        throw new Error("Failed to update completion status");
      }
    } catch (error) {
      console.error(error.message);
      alert("There was an error updating the completion status.");
    }
  };

  const editTodo = (id) => {
    setToDos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = async ({ task, dueDate }, id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/tasks/edit/${id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task, due_date: dueDate }), // Send only the updated task name
      });

      if (response.ok) {
        const updatedTask = await response.json();
        setToDos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, ...updatedTask, isEditing: false }
              : todo
          )
        );
      } else {
        throw new Error("Failed to edit task");
      }
    } catch (error) {
      console.error(error.message);
      alert("There was an error saving the task edit.");
    }
  };

  const clearTasks = () => {
    const confirmClear = window.confirm(
      "Are you sure you want to clear all tasks?"
    );
    if (confirmClear) {
      setToDos([]);
    }
  };

  // Separate active and completed tasks
  const activeTasks = todos.filter((todo) => !todo.completed);
  const completedTasks = todos.filter((todo) => todo.completed);

  // Tasks Left count for the active tasks
  const tasksLeftCount = activeTasks.length;
  // const tasksLeftCount = todos.filter((todo) => !todo.completed).length;

  // Tasks Completed count for the completed tasks
  const tasksCompletedCount = completedTasks.length;

  return (
    <div
      className="ToDoWrapper animate-swipeUp"
      style={{
        backgroundImage: `url(${ToDoApp1})`,
        backgroundSize: "cover", // Cover the entire area
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent tiling
      }}
    >
      <div>
        <h1 className="text-center font-bold mb-6">MY TASKS</h1>
        <ToDoForm addToDo={addToDo} />
        {/* display todos */}
        <div className="bg-gray-400 w-[100%] py-2 border rounded-lg">
          <div className="flex items-center justify-between w-[95%] mb-4 ml-3 text-xl">
            <h3>Tasks List</h3>
            <button
              className="transform transition duration-300 ease-in-out hover:scale-110"
              onClick={clearTasks}
            >
              {/* Clear all tasks */}
            </button>
          </div>

          {/* Render Active Tasks */}
          <h3 className="ml-4 text-lg">Active Tasks[{tasksLeftCount}]</h3>
          {activeTasks.length > 0 ? (
            activeTasks.map((todo) =>
              todo.isEditing ? (
                <EditToDoForm key={todo.id} editToDo={editTask} task={todo} />
              ) : (
                <ToDo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                />
              )
            )
          ) : (
            <p className="ml-4 text-gray-600">No active tasks</p>
          )}

          {/* Render Completed Tasks */}
          <h3 className="ml-4 text-lg mt-6">
            Completed Tasks [{tasksCompletedCount}]
          </h3>
          {completedTasks.length > 0 ? (
            completedTasks.map((todo) =>
              todo.isEditing ? (
                <EditToDoForm key={todo.id} editToDo={editTask} task={todo} />
              ) : (
                <ToDo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                />
              )
            )
          ) : (
            <p className="ml-4 text-gray-600">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default ToDoWrapper;
