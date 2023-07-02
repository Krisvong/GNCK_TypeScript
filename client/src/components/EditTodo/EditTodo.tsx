import React, { Fragment, useState, useEffect } from "react";
import { BsFillPencilFill } from 'react-icons/bs';
import { BsFillHandThumbsUpFill } from 'react-icons/bs';
import { BsFillHandThumbsDownFill } from 'react-icons/bs';

const EditTodo = ({ todo }) => {
  // Set up state for the description of the todo
  const [description, setDescription] = useState(todo.description || "");

  // Add an event listener to the modal when it is hidden
  useEffect(() => {
    // Get a reference to the modal element using the ID of the todo
    const modalElement = document.querySelector(`#id${todo.todo_id}`);
    modalElement.addEventListener("hide.bs.modal", () => {
      // If the description in state has changed, update it with the original value
      if (description !== todo.description) {
        setDescription(todo.description);
      }
    });
  }, [description, todo]);

  // Function to update the description of the todo
  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      // Create a request body with the updated description
      const body = { description };
      // Send a PUT request to update the todo
      const response = await fetch(
        `http://localhost:5001/todos/${todo.todo_id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      // Reload the page to show the updated todo list
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  };

  // Render the edit button and modal
  return (
    <Fragment>
      {/* Edit button */}
      <button
        type="button"
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        <BsFillPencilFill />
      </button>

      {/* Modal */}
      <div className="modal" id={`id${todo.todo_id}`}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Edit Todo</h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              {/* Text input for the description */}
              <input
                type="text"
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              {/* Edit button */}
              <button
                type="button"
                className="btn btn-warning"
                data-bs-dismiss="modal"
                onClick={(e) => updateDescription(e)}
              >
                <BsFillHandThumbsUpFill />
              </button>
              {/* Close button */}
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                <BsFillHandThumbsDownFill />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default EditTodo;