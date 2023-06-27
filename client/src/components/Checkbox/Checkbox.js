import React from "react";
import "./Checkbox.scss";
import { MDBSwitch } from 'mdb-react-ui-kit';


//Define the Checkbox component with the props 'todo' and 'onChange'
const Checkbox = ({ todo, onChange }) => {
  const handleOnChange = async () => {
    console.log("Checkbox toggled")

    const updatedTodo = { ...todo, completed: !todo.completed };
    const response = await fetch(`http://localhost:5001/todos/${todo.todo_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Update the parent component with the updated todo
    onChange(updatedTodo);

    // Move the todo to the completed list if it is now completed
    if (updatedTodo.completed) {
      const completedTodo = {
        ...updatedTodo,
        description: todo.description // Add the description field to the completed todo
      };
      await fetch("http://localhost:5001/completed_todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(completedTodo),
      });
      // Remove the todo from the todos list
      await fetch(`http://localhost:5001/todos/${todo.todo_id}`, {
        method: "DELETE",
      });
    }
  };

  return (
    <button
      checked={!!todo.completed} // Ensure that checked is always defined
      onChange={handleOnChange}>
      <MDBSwitch />
    </button>
  );
};

export default Checkbox;