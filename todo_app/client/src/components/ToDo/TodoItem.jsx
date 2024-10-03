import React from "react";


function TodoItem({ task, deleteTask, toggleCompleted }) {

    function handleChange() {
        toggleCompleted(task.id);
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