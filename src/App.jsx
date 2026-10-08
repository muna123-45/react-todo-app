import { useState } from "react";
import "./App.css";
function App() {
  const [todos, setTodos] = useState([]);

  const getTodos = async () => {
    try {
      const response = await fetch("https://dummyjson.com/todos");

      const data = await response.json();

      setTodos(data.todos); //imp
      // console.log(data.todos);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  const toggleTodo = (id) => {
    const newTodos = todos.map((todos) => {
      if (todos.id === id) {
        todos.completed = !todos.completed;
      }
      return todos;
    });
    setTodos(newTodos);
  };

  const completedCount = todos.filter(
    (todos) => todos.completed === true,
  ).length;

  const pendingCount = todos.filter(
    (todos) => todos.completed === false,
  ).length;

  const deleteTodo = (id) => {
    const newTodos = todos.filter((todos) => todos.id !== id);
    setTodos(newTodos);
  };
  const editTodo = (id) => {
    const newTitle = prompt("Enter new title");

    if (newTitle !== null && newTitle !== "") {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          todo.todo = newTitle;
        }

        return todo;
      });

      setTodos(newTodos);
    }
  };

  return (
    <div className="container">
      <h1>Todo List</h1>

      <button onClick={getTodos} className="get-btn">
        Get Todos
      </button>

      <div className="counter-container">
        <div className="counter pending-counter">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>
        <div className="counter completed-counter">
          <h3>Completed</h3>
          <p>{completedCount}</p>
        </div>
      </div>

      <div className="todo-container">
        {todos.map((todos) => (
          <div className="todo-card" key={todos.id}>
            <button
              className="todo-circle"
              onClick={() => toggleTodo(todos.id)}
            ></button>
            <div className="todo-content">
              {todos.completed === true && (
                <h3 className="line-through">{todos.todo}</h3>
              )}

              {todos.completed === false && <h3>{todos.todo}</h3>}

              <p>
                Status:
                {todos.completed === true && (
                  <span className="completed">Completed</span>
                )}
                {todos.completed === false && (
                  <span className="pending">Pending</span>
                )}
              </p>
            </div>
            <div className="todo-actions">
              <button className="edit-btn" onClick={() => editTodo(todos.id)}>
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todos.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
