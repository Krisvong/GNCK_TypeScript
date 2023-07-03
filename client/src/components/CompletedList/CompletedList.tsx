import React, { useState, useEffect } from "react";
import './CompletedList.scss';
import { BsXCircleFill } from 'react-icons/bs';

interface CompletedListProps {
  isCompletedTodoUpdated: boolean;
}

interface CompletedTask {
  completed_todo_id: number;
  description: string;
}

const CompletedList: React.FC<CompletedListProps> = ({ isCompletedTodoUpdated }) => {
  const [completedTasks, setCompletedTasks] = useState<CompletedTask[]>([]);

  useEffect(() => {
    fetch("http://localhost:5001/completed_todos")
      .then((response) => response.json())
      .then((data) => setCompletedTasks(data));
  }, [isCompletedTodoUpdated]);

  const handleDelete = (id: number) => {
    fetch(`http://localhost:5001/completed_todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Remove the completed todo with the specified ID from the completedTasks array
        setCompletedTasks(
          completedTasks.filter((task) => task.completed_todo_id !== id)
        );
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="completed">
      <h3>Completed Tasks</h3>
      <ul>
        {completedTasks.map((task, index) => (
          <li key={index}>
            {task.description}
            <button onClick={() => handleDelete(task.completed_todo_id)}>
              <BsXCircleFill />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompletedList;