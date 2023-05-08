import React, { useState } from "react";
import { initialTodos } from "./initialTodos";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import { Todo, ToggleComplete, AddTodo, EditTodo, RemoveTodo } from "./types";
import { DragDropContext } from "react-beautiful-dnd";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Array<Todo>>(initialTodos);

  const toggleComplete: ToggleComplete = selectedTodo => {
    const updatedTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return { ...todo, complete: !todo.complete };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const addTodo: AddTodo = newTodo => {
    newTodo.trim() !== "" &&
      setTodos([...todos, { text: newTodo, complete: false }]);
  };

  const editTodo: EditTodo = (selectedTodo, newText) => {
    const updatedTodos = todos.map(todo => {
      if (todo === selectedTodo) {
        return { ...todo, text: newText };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const removeTodo: RemoveTodo = selectedTodo => {
    const updatedTodos = todos.filter(todo => todo !== selectedTodo);
    setTodos(updatedTodos);
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [removed] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, removed);

    setTodos(reorderedTodos);
  };



  return (
    <React.Fragment>
      <DragDropContext onDragEnd={onDragEnd}>
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          editTodo={editTodo}
          removeTodo={removeTodo}
        />
      </DragDropContext>
      <AddTodoForm addTodo={addTodo} />
    </React.Fragment>
  );
};

export default App;
