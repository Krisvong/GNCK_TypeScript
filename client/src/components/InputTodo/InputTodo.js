import React, { Fragment, useState } from "react";
import './InputTodo.css'


const InputTodo = () => {
  // Declare state variables for the description and due date fields
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Define a function to be called when the form is submitted
  const onSubmitForm = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior, allows the todo list to be updated without the page being reloaded.

    if (description.trim() === "") {
      // Check if the input field is empty
      return; // If it is empty, do nothing
    }

    try {
      // Create an object 'body' with the description and due date of the todo item
      const body = { description, due_date: dueDate };
      console.log("body:", body);

      // Send a POST request to the server to create a new todo item
      const response = await fetch("http://localhost:5001/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Redirect to the home page after the request has been sent successfully
      window.location = "/";
    } catch (err) {
      // Log the error message to the console if an error occurs
      console.error(err.message);
    }
  };

  // Render a form with input fields for the description and due date, and a button
  return (
    <Fragment>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          className="form-control"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button className="btn">
          Add Task
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;