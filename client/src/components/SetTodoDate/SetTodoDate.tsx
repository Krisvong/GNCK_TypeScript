import React, { useState } from "react";

interface SetTodoDateProps {
  onSubmit: () => void;
  todo: {
    description: string;
  };
}

const SetTodoDate: React.FC<SetTodoDateProps> = ({ onSubmit, todo }) => {
  // Declare state variable for the selected date
  const [selectedDate, setSelectedDate] = useState("");

  // Define a function to be called when the form is submitted
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior, allows the todo list to be updated without the page being reloaded.

    try {
      // Create an object 'body' with the description of the todo item and the selected due date
      const body = {
        description: todo.description,
        due_date: selectedDate,
      };

      // Send a POST request to the server to create a new todo item with the due date
      await fetch("http://localhost:5001/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      // Call the onSubmit function to update the todo list after the request has been sent successfully
      onSubmit();
    } catch (err: any) {
      // Log the error message to the console if an error occurs
      console.error(err.message);
    }
  };

  // Render a date input field
  return (
    <form onSubmit={handleSubmit}>
    <input
      type="date"
      value={selectedDate}
      onChange={(e) => setSelectedDate(e.target.value)}
    />
    {/* <button type="submit">Submit</button> */}
    </form>
  );
};

export default SetTodoDate;
