// Require the necessary dependencies
const express = require("express");
const app = express();
const cors = require("cors");
import { pool } from "./db"; // Import the database connection pool from db.js
import { Request, Response } from "express";

// Set up middleware
app.use(cors()); // Enable CORS (Cross-Origin Resource Sharing)
app.use(express.json()); // Enable JSON parsing for request bodies
require("dotenv").config(); // Load environment variables from a .env file if it exists

// Define routes for the application

//Welcome message route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to our Todo API, where you can procrastinate in style!");
});

// Route to CREATE a new todo
// To test in POSTMAN: POST http://localhost:5001/todos/ (in the body raw JSON: { "description": "Create a TODO API", "due_date": "2023-05-01" })
// The reason why the route name is "todos" instead of "todo" is that it follows a common RESTful convention of using plural nouns for endpoints that deal with collections or lists of items.
app.post("/todos", async (req: Request, res: Response) => {
  try {
    const { description, due_date } = req.body;

    // Check if the todo already exists with the same description and due_date
    const existingTodo = await pool.query(
      "SELECT * FROM todo WHERE description = $1 AND due_date = $2",
      [description, due_date]
    );

    if (existingTodo.rows.length > 0) {
      // If the todo already exists, update the existing todo by ID with the new description
      const { todo_id } = existingTodo.rows[0];
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, todo_id]
      );

      console.log("Todo updated:", updateTodo.rows[0]);
      res.json(updateTodo.rows[0]);
    } else {
      // If the todo doesn't exist, insert it into the database
      const newTodo = await pool.query(
        "INSERT INTO todo (description, due_date) VALUES($1, $2) RETURNING *",
        [description, due_date]
      );

      console.log("New Todo:", newTodo.rows[0]);
      res.json(newTodo.rows[0]);
    }
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to CREATE a new completed todo
app.post("/completed_todos", async (req: Request, res: Response) => {
  try {
    const { description, due_date } = req.body;

    // Insert the completed todo into the database
    const newCompletedTodo = await pool.query(
      "INSERT INTO completed_todo (description, due_date) VALUES ($1, $2) RETURNING *",
      [description, due_date]
    );

    console.log("New completed todo:", newCompletedTodo.rows[0]);

    // Delete the corresponding todo from the todo table
    const { todo_id } = req.body;
    const deleteTodo = await pool.query(
      "DELETE FROM todo WHERE todo_id = $1 RETURNING *",
      [todo_id]
    );

    console.log("Deleted todo:", deleteTodo.rows[0]);

    res.json(newCompletedTodo.rows[0]);
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});


//Route to get READ all todos
//To test in POSTMAN: GET http://localhost:5001/todos/ if your table is empty, you will get an empty array
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err: unknown) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});


//Route to get READ a single todo by ID
//To test in POSTMAN: GET http://localhost:5001/todos/2 (in this case, 2 was the todo_id number I was getting)
app.get("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Extract the 'id' parameter from the request URL
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]); // Select the row with the matching ID from the 'todo' table

    res.json(todo.rows[0]); // Return the row in JSON format
  } catch (err) {
    console.error((err as Error).message); // If there's an error, log it to the console
  }
});

//Route to get all completed todos
app.get("/completed_todos", async (req: Request, res: Response) => {
  try {
    const allCompletedTodos = await pool.query("SELECT * FROM completed_todo");

    res.json(allCompletedTodos.rows);
  } catch (err: unknown) {
    console.error((err as Error).message);
  }
});

//Route to get completed todos by id
app.get("/completed_todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const completedTodo = await pool.query(
      "SELECT * FROM completed_todo WHERE completed_todo_id = $1",
      [id]
    );

    if (completedTodo.rows.length === 0) {
      return res.status(404).json({ message: "Completed todo not found" });
    }

    res.json(completedTodo.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ message: "Server error" });
  }
});

//Route to UPDATE a todo by ID and optionally update its due date
//To test in POSTMAN: PUT {"description": "Clean Car", "due_date": "2023-05-15"} http://localhost:5001/todos/2 (in this case, 2 was the todo_id number I was updating)
app.put("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { description, due_date } = req.body;

    // Check if both description and due_date are provided
    if (description && due_date) {
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1, due_date = $2 WHERE todo_id = $3",
        [description, due_date, id]
      );
      res.json("Todo was updated!");
    }
    // Check if only description is provided
    else if (description) {
      const updateTodo = await pool.query(
        "UPDATE todo SET description = $1 WHERE todo_id = $2",
        [description, id]
      );
      res.json("Todo description was updated!");
    }
    // Check if only due_date is provided
    else if (due_date) {
      const updateTodo = await pool.query(
        "UPDATE todo SET due_date = $1 WHERE todo_id = $2",
        [due_date, id]
      );
      res.json("Todo due date was updated!");
    }
    // Handle the case where neither description nor due_date is provided
    else {
      res
        .status(400)
        .json({ error: "Please provide either description or due_date" });
    }
  } catch (err) {
    console.error((err as Error).message);
    res.status(500).json({ error: "Server error" });
  }
});

//Route to DELETE a todo by ID
//To test in POSTMAN: DELETE http://localhost:5001/todos/2 (in this case, 2 was the todo_id number I was deleting)
app.delete("/todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // get the todo id from the request parameters
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]); // delete the todo from the database with the given id

    res.json("Todo was deleted!"); // return a success message
  } catch (err) {
    console.log((err as Error).message); // log any errors to the console
  }
});

// Route to DELETE a completed todo by ID
app.delete("/completed_todos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Delete the completed todo from the completed_todo table
    const deletedTodo = await pool.query(
      "DELETE FROM completed_todo WHERE completed_todo_id = $1 RETURNING *",
      [id]
    );

    console.log("Deleted todo:", deletedTodo.rows[0]);

    res.json(deletedTodo.rows[0]);
  } catch (err) {
    console.error((err as Error).message);
  }
});

app.listen(process.env.PORT, () => {
  console.log(
    `Making a todo list on port: ${process.env.PORT} with the ALLSTARS Casey, Nick, Gregg, and Kristen`
  );
});