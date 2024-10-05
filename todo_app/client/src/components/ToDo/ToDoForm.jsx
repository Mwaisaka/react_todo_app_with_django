
import React, { useState } from "react";
// import { CiCirclePlus } from "react-icons/ci";

function ToDoForm({ addToDo }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task.trim()) {
      const confirmAdd = window.confirm("Do you want to add this new task?");

      if (confirmAdd) {
        // If user confirms, add the task
        // fetch("http://127.0.0.1:5555/addtask", {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify({ task: task }),
        // })
        //   .then((response) => {
        //     if (!response.ok) {
        //       return response.json().then((errorData) => {
        //         throw new Error(errorData.message);
        //       });
        //     }
        //     return response.json();
        //   })
        //   .then((data) => {
        //     console.log("Task added: ", data);
        //     alert("New task added successfully.");

        //     // Add task to the local list
        //     addToDo(task);

        //     // Clear form after submission
        //     setTask("");
        //     setError("");
        //   })
        //   .catch((error) => {
        //     console.log("Error: ", error.message);
        //     setError("Failed to add task: " + error.message);
        //   });

        alert("New task added successfully.");

            // Add task to the local list
            addToDo(task);

            // Clear form after submission
            setTask("");
            setError("");
      } else {
        alert("Task addition cancelled.");
        setTask("");
        setError("");
      }
    } else {
      setError("Please enter a task in the above field.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ToDo-Form gap-5 mb-5 flex flex-col"
    >
      <div className="relative w-full flex items-center">
        {/* <span className="absolute left-2 top-1/2 transform -translate-y-5 text-gray-500">
        <CiCirclePlus size={24}/>
        </span> */}

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input-form flex-grow py-2 px-3 rounded-l-lg border border-gray-300"
          placeholder="Add a new task..."
        />

        <button
          type="submit"
          className="bg-orange-500 text-white font-bold py-2 px-4 rounded-r-lg hover:bg-orange-600 transition duration-300 ease-in-out"
        >
          Add
        </button>
      </div>

      {/* Error message below the input field */}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
}

export default ToDoForm;
