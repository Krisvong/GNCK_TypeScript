import React, { Fragment, useState } from "react"; //groups list of children without adding extra nodes to the DOM
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import './App.css';

//components
import InputTodo from "./components/InputTodo/InputTodo";
import ListTodos from "./components/ListTodos/ListTodos";
import About from './components/About/About'
import Sidebar from "./components/Sidebar/Sidebar";

function Header() {
  return (
    <header>
      <Container>
        <Nav.Item>
          <h1>GNCK List</h1>
        </Nav.Item>
        <Nav defaultActiveKey="/" variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link as={Link} to="/">
              Todo
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Container>
    </header>
  );
}

function Display() {
  const [isCompletedTodoUpdated, setIsCompletedTodoUpdated] = useState(false);

  const handleCompletedTodo = () => {
    setIsCompletedTodoUpdated(!isCompletedTodoUpdated);
  };

  return (
    <div className="display">
      <Routes>
        <Route path="/" element={<Fragment>
          <InputTodo />
          <ListTodos onTodoCompleted={handleCompletedTodo} />
          <Sidebar
            isCompletedTodoUpdated={isCompletedTodoUpdated}
            handleCompletedTodo={handleCompletedTodo}
          />
        </Fragment>} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
          <Display />
        </main>
      </Router>
    </div>
  );
}

export default App;