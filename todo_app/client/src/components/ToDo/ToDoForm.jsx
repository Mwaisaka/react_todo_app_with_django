import React, { useState, useEffect} from "react";
// import { CiCirclePlus } from "react-icons/ci";

function ToDoForm({ addToDo, user}) {
  const [task, setTask] = useState("");
  const [due_date, setDue_date] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const API_URL = "http://127.0.0.1:8000";
  const API_URL = process.env.REACT_APP_API_URL;

  // Check if the user is authenticated by verifying token presence
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("Token from UseEffect", token);
    setIsAuthenticated(!!token);
  }, [user.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Logged in user from add todo:",user);
    // if (!isAuthenticated) {
    //   setError("Please log in to add tasks.");
    //   return;
    // }

    if (task.trim() && due_date) {
      const confirmAdd = window.confirm("Do you want to add this new task?");

      if (confirmAdd) {
        // Ensure token is correctly retrieved
        const token = localStorage.getItem("authToken");
        console.log("Token from handleSubmit", token);
        if (!token) {
          setError("Please log in to add tasks.");
          return;
        }
        // If user confirms, add the task
        fetch(`${API_URL}/tasks/add_task/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, // Add Authorization header
          },

          body: JSON.stringify({ task, due_date }),
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

            // Add task to the local list
            addToDo(data.task, data.due_date);

            // Clear form after submission
            setTask("");
            setDue_date("");
            setError("");
          })
          .catch((error) => {
            console.log("Error: ", error.message);
            setError("Failed to add task: " + error.message);
          });

        // Add task to the local list
        addToDo(task);

        // Clear form after submission
        setTask("");
        setDue_date("");
        setError("");
      } else {
        alert("Task addition cancelled.");
        setTask("");
        setDue_date("");
        setError("");
      }
    } else {
      setError("Please enter both a task and a due date in the above fields.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="ToDo-Form gap-5 mb-5 flex flex-col"
    >
      <div className="flex w-full justify-between mb-4 gap-5">
        {/* Task Input */}
        <div className="w-[68%] flex flex-col">
          <label htmlFor="task" className="mb-1 font-semibold">
            Task Name:
          </label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-lg"
            placeholder="Add a new task..."
          />
        </div>

        {/* Due Date Input */}
        <div className="w-[32%] flex flex-col">
          <label htmlFor="date" className="mb-1 font-semibold">
            Due Date:
          </label>
          <input
            type="date"
            id="date"
            value={due_date}
            onChange={(e) => setDue_date(e.target.value)}
            className="py-2 px-3 border border-gray-300 rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white font-bold py-2 px-3 h-[30%] rounded-lg mt-8 hover:bg-orange-600 transition duration-300 ease-in-out"
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
