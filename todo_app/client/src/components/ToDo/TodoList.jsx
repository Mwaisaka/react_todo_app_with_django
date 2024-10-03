import React, { useState, useEffect } from "react";
import TodoItem from './TodoItem';


function TodoList() {

    const [tasks, setTasks] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        fetch("http://127.0.0.1:5555/tasks")
            .then((r) => r.json())
            .then(setTasks);
    }, []);

    function addTask(text) {
        // const newTask = {
        //     id: Date.now(),
        //     text,
        //     completed: false
        // };
        fetch("http://127.0.0.1:5555/add_task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text, complete: false })
        })
            .then(response => {
                if (response.ok) {
                    // If the request is successful, update the local state with the new task
                    return response.json();
                } else {
                    throw new Error('Failed to add task');
                }
            })
            .then(data => {
                setTasks([...tasks, data]);
                setText('');
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function deleteTask(id) {
        fetch(`http://127.0.0.1:5555/delete_task/${id}`, {
            method: "DELETE",
        })
            .then(response => {
                if (response.ok) {
                    setTasks(tasks.filter(task => task.id !== id));
                } else {
                    throw new Error('Failed to delete task');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    function toggleCompleted(id) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed }
            } else {
                return task;
            }
        }));
    }
    return (

        <div classname="todo-item">
            <input
                value={text}
                placeholder="Enter task name here..."
                onChange={e => setText(e.target.value)}
                style={{ marginRight: "10px" }}
            />
            <button onClick={() => addTask(text)}>Add New Task</button>
            <br />
            <br />
            <div >
                {tasks.map(task => (
                    <div key={task.id} className="todo-item-container">
                        <TodoItem
                            task={task}
                            deleteTask={deleteTask}
                            toggleCompleted={toggleCompleted}
                        />
                    </div>

                ))}

            </div>
        </div>
    );
}

export default TodoList;