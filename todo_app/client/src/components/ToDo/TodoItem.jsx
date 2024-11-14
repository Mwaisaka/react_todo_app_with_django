import React from "react";


function TodoItem({ task, deleteTask, toggleCompleted }) {

  const API_URL = "http://127.0.0.1:8000";

    function handleChange() {
        toggleCompleted(task.id);

        // Send updated status to the backend
    fetch(`${API_URL}/tasks/${task.id}/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !task.completed }), // Toggle completed status
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update task status");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Task status updated:", data);
        })
        .catch((error) => {
          console.error("Error updating task status:", error);
        });
    }

    return (
        <div className="todo-item">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={handleChange}
                style={{ marginRight: "10px" }}
            />
            <p style={{ textDecoration: task.completed ? "line-through" : "none" }}>{task.text}</p>
            
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: "10px" }}>Delete</button>
        </div>
    )
}

export default TodoItem;