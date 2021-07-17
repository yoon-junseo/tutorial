import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../modules";
import { toggleTodo, removeTodo, addTodo } from "../modules/todos";
import TodoInsert from "../components/TodoInsert";
import TodoList from "../components/TodoList";

const TodoApp = () => {
  const [id, setId] = useState(1);
  const todos = useSelector((state: RootState) => state.todos.todoList);
  const dispatch = useDispatch();

  const onInsert = (text: string) => {
    dispatch(
      addTodo({
        text,
        id,
        done: false,
      })
    );
    setId((prevState) => prevState + 1);
  };

  const onToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  const onRemove = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  );
};

export default TodoApp;
