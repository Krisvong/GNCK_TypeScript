import React, { Fragment, useEffect, useState } from "react";
import EditTodo from "../EditTodo/EditTodo";
import Checkbox from "../Checkbox/Checkbox";
import "./ListTodos.scss";
import { BsTrash3Fill } from 'react-icons/bs';


const ListTodos = ({ onTodoCompleted }) => {
  const [todos, setTodos] = useState([]);

  // Function to delete a todo with the given id
  const deleteTodo = async (id) => {
    try {
      // Send a DELETE request to the server to delete the todo with the given id
      await fetch(`http://localhost:5001/todos/${id}`, {
        method: "DELETE",
      });

      // Update the state by removing the deleted todo
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  // Function to retrieve todos from the server
  const getTodos = async () => {
    try {
      // Send a GET request to the server to retrieve all todos
      const response = await fetch("http://localhost:5001/todos");
      const jsonData = await response.json();

      console.log(jsonData);

      // Update the state with the retrieved todos
      setTodos(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  // Call getTodos() only once when the component mounts
  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      {/* Create a table to display the todos */}
      <table className="table_mt-5_text-center">
        <thead>
          <tr>
            {/* Table headers */}
            <th>Completed</th>
            <th>Date</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {/* Render a row for each todo */}
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              {/* Checkbox to mark the todo as completed */}
              <td>
                <Checkbox
                  todo={todo}
                  onChange={(updatedTodo) => {
                    // Find the index of the updated todo in the todos array
                    const index = todos.findIndex(
                      (t) => t.todo_id === updatedTodo.todo_id
                    );

                    // Create a new copy of the todos array with the updated todo
                    const newTodos = [...todos];
                    newTodos[index] = updatedTodo;

                    // Update the todos state with the new copy of the todos array
                    setTodos(newTodos);

                    // Invoke the callback function to update the completed tasks list in App
                    if (updatedTodo.completed) {
                      onTodoCompleted?.(updatedTodo);
                      setTodos(newTodos.filter((todo) => !todo.completed)) 
                    }
                  }}
                />
              </td>

              {/* Display the due date of the todo */}
              <td>{new Date(todo.due_date).toLocaleDateString()}</td>
              {/* Display the description of the todo */}
              <td>{todo.description}</td>
              {/* Button to edit the todo */}
              <td>
                <EditTodo todo={todo} />
              </td>
              {/* Button to delete the todo */}
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  <BsTrash3Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
