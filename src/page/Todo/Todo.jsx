import "./Todo.css";

import { fetchTodos } from "../../data/todos";
import { useState, useEffect, useRef } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Todo() {
    const [todoRaw, setTodoRaw] = useState([]);
  
    // Filter
    const [OnlyWaiting, setOnlyWaiting] = useState(false);
    const [itemsPerPage, setItemsPerPage] = useState(5);
  
    // Todos
    const [todos, setTodos] = useState([]);
  
    // Display
    const [numPage, setNumPage] = useState(1);
    const [curPage, setCurPage] = useState(1);
  
    // Recalculate numPage when itemsPerPage or todos.length change
    useEffect(() => {
      setNumPage(Math.ceil(todos.length / itemsPerPage));
    }, [itemsPerPage, todos.length]);
  
    // Ensure curPage does not exceed numPage
    useEffect(() => {
      setCurPage((prev) => Math.min(prev, numPage));
    }, [numPage]);
  
    // Fetch todos once on load
    useEffect(() => {
      setTodoRaw(fetchTodos());
    }, []);
  
    // Update filtered todos when OnlyWaiting or todoRaw change
    useEffect(() => {
      if (OnlyWaiting) {
        setTodos(todoRaw.filter((todo) => !todo.completed));
      } else {
        setTodos(todoRaw);
      }
    }, [todoRaw, OnlyWaiting]);
  
    // Event handlers
    function deleteClick(id) {
      const todosRemin = todoRaw.filter((todo) => todo.id !== id);
      setTodoRaw(todosRemin);
    }
  
    function waitingClick(id) {
      const todoSelected = todoRaw.find((todo) => todo.id === id);
      if (todoSelected) {
        todoSelected.completed = true;
        setTodoRaw([...todoRaw]);
      }
    }
  
    function addClick(title) {
      const newId = Number(
        todoRaw.reduce((prev, todo) => (todo.id > prev ? todo.id : prev), 0)
      ) + 1;
      const newItem = {
        id: newId,
        title,
        completed: false,
        userId: 1,
      };
      setTodoRaw([...todoRaw, newItem]);
    }
  
    // Modal handler
    const [show, setShow] = useState(false);
    const newTitleRef = useRef();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <div className="todo-container">
        {/* Modal */}
        <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              <span className="bi bi-plus-lg">&nbsp; Add todo</span>
            </Modal.Title>
          </Modal.Header>
  
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                <Form.Label>Title:</Form.Label>
                <Form.Control type="text" autoFocus ref={newTitleRef} />
              </Form.Group>
            </Form>
          </Modal.Body>
  
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              <span className="bi bi-x-lg">&nbsp; Cancel</span>
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                const title = newTitleRef.current.value.trim();
                if (title === "") {
                  alert("Title cannot be empty");
                  newTitleRef.current.value = "";
                  newTitleRef.current.focus();
                } else {
                  addClick(title);
                  handleClose();
                }
              }}
            >
              <span className="bi bi-plus-lg">&nbsp; Add</span>
            </Button>
          </Modal.Footer>
        </Modal>
  
        {/* Filter control */}
        <div className="todo-filter-control">
          {/* Toggle */}
          <div className="form-check form-switch">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
              Show only &nbsp;
              <button className="btn btn-warning">
                waiting&nbsp;
                <span className="bi bi-clock"></span>
              </button>
            </label>
          </div>
  
          {/* Items per page */}
          <select
            className="form-select"
            aria-label="Default select example"
            style={{ width: "200px" }}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            <option value="5" selected>5 items per page</option>
            <option value="10">10 items per page</option>
            <option value="50">50 items per page</option>
            <option value="100">100 items per page</option>
          </select>
        </div>
  
        {/* Todo list table */}
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th style={{ width: "5%" }} valign="middle">ID</th>
              <th valign="middle">TITLE</th>
              <th style={{ textAlign: "right", width: "20%" }} valign="middle">
                Completed &nbsp;
                <button className="btn btn-primary" onClick={handleShow}>
                  <span className="bi bi-plus-lg"></span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo, index) => {
                const min = (curPage - 1) * itemsPerPage;
                const max = curPage * itemsPerPage - 1;
                return index >= min && index <= max;
              })
              .map((todo) => (
                <tr key={todo.id}>
                  <td valign="middle">
                    <span className="badge bg-secondary" style={{ width: "3rem" }}>
                      {todo.id}
                    </span>
                  </td>
                  <td align="left" valign="middle">{todo.title}</td>
                  <td align="right" valign="middle">
                    <button
                      className={`btn ${todo.completed ? "btn-success" : "btn-warning"}`}
                      onClick={() => waitingClick(todo.id)}
                    >
                      {todo.completed ? "done" : "waiting"}&nbsp;
                      <span className={`bi ${todo.completed ? "bi-check" : "bi-clock"}`}></span>
                    </button>
                    &nbsp;
                    <button className="btn btn-danger" onClick={() => deleteClick(todo.id)}>
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
  
        {/* Page control */}
        <div className="todo-button-spaceing">
          <button
            className="btn btn-outline-primary todo-button-spaceing"
            onClick={() => setCurPage(1)}
            disabled={curPage === 1}
          >
            First
          </button>
          <button
            className="btn btn-outline-primary todo-button-spaceing"
            onClick={() => curPage > 1 && setCurPage(curPage - 1)}
            disabled={curPage === 1}
          >
            Previous
          </button>
          <span>{curPage}&nbsp;/&nbsp;{numPage}</span>
          <button
            className="btn btn-outline-primary todo-button-spaceing"
            onClick={() => curPage < numPage && setCurPage(curPage + 1)}
            disabled={curPage === numPage}
          >
            Next
          </button>
          <button
            className="btn btn-outline-primary todo-button-spaceing"
            onClick={() => setCurPage(numPage)}
            disabled={curPage === numPage}
          >
            Last
          </button>
        </div>
      </div>
    );
  }

export default Todo;
