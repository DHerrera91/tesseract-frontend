import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import { useEffect } from "react";
import { callTodoList, createTodo, update, eliminate } from "./Conection";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const refreshToDo = () => {
    callTodoList().then((todos) => {
      console.log(todos);
      setTodos(todos);
    });
  };

  useEffect(() => {
    refreshToDo();
  }, []);

  const addTodo = async (todo) => {
    //todo: { text:""}
    if (!todo.title || /^\s*$/.test(todo.title)) {
      return;
    }
    await createTodo(todo);
    refreshToDo();
  };

  const showDescription = (todoId) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        todo.showDescription = !todo.showDescription;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const updateTodo = async (todoId, newValue) => {
    if (!newValue.title || /^\s*$/.test(newValue.title)) {
      return;
    }
    await update(todoId, newValue);
    refreshToDo();

    // setTodos((prev) =>
    //   prev.map((item) => (item.id === todoId ? newValue : item))
    // );
  };

  const removeTodo = (id) => {
    const removedArr = [...todos].filter((todo) => todo.id !== id);
    eliminate(id);

    setTodos(removedArr);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.is_done = !todo.is_done;
        update(todo.id, todo);
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <>
      <h1>Make successful your day!</h1>
      <TodoForm onSubmit={addTodo} />
      <Todo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
        showDescription={showDescription}
      />
    </>
  );
}
export default TodoList;
