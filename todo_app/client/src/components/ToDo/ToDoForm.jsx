import React, { useState } from "react";
// import { CiCirclePlus } from "react-icons/ci";

function ToDoForm({ addToDo }) {
  const [task, setTask] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    //prevent default
    e.preventDefault();

    if (task.trim()) {
      //Ask the user for confirmation before adding the task
      const confirmAdd = window.confirm("Do you want to add this new task?");

      if (confirmAdd) {
        //If user confirms, add the task

        fetch("http://127.0.0.1:5555/addtask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task: task }),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((errorData) => {
                throw new Error(errorData.message);
              });
            }
            return response.json();
          })
          .then((data) => {
            console.log("Task added: ", data);
            alert("New task added successfully.");

            //Add task to the local list
            addToDo(task);

            //clear form after submission
            setTask("");
            setError("");
          })
          .catch((error) => {
            console.log("Error: ", error.message);
            setError("Failed to add task: ", error.message);
          });
      } else {
        //If user cancels, do not add the task and return
        alert("Task addition cancelled.");
        setTask("");
        setError("");
      }
    } else {
      setError("Please enter a task in the above field.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="ToDo-Form gap-5 mb-5">
      <div className="relative w-[100%] flex items-center rounded-lg">
        {/* <span className="absolute left-2 top-1/2 transform -translate-y-5 text-gray-500">
        <CiCirclePlus size={24}/>
        </span> */}

        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="todo-input-form "
          placeholder="Add a new task..."
        />

        <button
          type="submit"
          className="absolute uppercase right-1 top-10 transform -translate-y-1/2 hover:bg-orange-100 text-gray-500 font-bold py-1 px-3 rounded-md transition duration-300 ease-in-out"
        >
          Add
        </button>
      </div>

      {error && <p className="text-red-600  mt-">{error}</p>}
    </form>
  );
}

export default ToDoForm;
