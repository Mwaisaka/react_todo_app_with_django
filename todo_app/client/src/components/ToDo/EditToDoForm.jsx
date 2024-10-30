import React, { useState, useEffect } from "react";

function EditToDoForm({ editToDo, task }) {
  const [value, setValue] = useState(task.task);
  const [dueDate, setDueDate] = useState(task.dueDate || "");

  useEffect(() => {
    setValue(task.task);
    setDueDate(task.dueDate || "");
  }, [task.task, task.dueDate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Ask the user for confirmation before adding the task
    const confirmEdit = window.confirm("Do you want to save this edited task?");

    if (confirmEdit) {
      //If user confirms saving the edited task
      editToDo({task:value, dueDate}, task.id);
      // setValue("");
      alert("Task edited and saved successfully.");
    } else {
      //If user cancels, do not save the edit of the task and return
      editToDo(task.task, task.id);
      alert("Task editing cancelled.");
    }
  };
  return (
    <form onSubmit={handleSubmit} className="ToDo-Form gap-5">
      <div className="relative w-[95%] flex items-center rounded-lg ml-4 gap-2">

        <div>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="todo-input-form h-10 ml-1"
        />
        </div>
        <div>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="todo-input-form h-10"
        />
        </div>
        
       
        <button
          type="submit"
          className="absolute uppercase right-1 top-9 transform -translate-y-1/2 hover:bg-orange-100 text-gray-500 font-bold py-1 px-3 rounded-md transition duration-300 ease-in-out"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditToDoForm;
