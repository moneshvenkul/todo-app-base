import React from "react";
import { Todo, ToggleComplete, EditTodo, RemoveTodo } from "./types";
import { TodoListItem } from "./TodoListItem";
import { Droppable, Draggable } from "react-beautiful-dnd";

interface TodoListProps {
  todos: Array<Todo>;
  toggleComplete: ToggleComplete;
  editTodo: EditTodo;
  removeTodo: RemoveTodo;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  editTodo,
  removeTodo,
}) => {
  return (
    <Droppable droppableId="todoList">
      {(provided) => (
        <ul ref={provided.innerRef} {...provided.droppableProps}>
          {todos.map((todo, index) => (
            <Draggable key={todo.text} draggableId={todo.text} index={index}>
              {(provided) => (
                <li
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <TodoListItem
                    todo={todo}
                    toggleComplete={toggleComplete}
                    editTodo={editTodo}
                    removeTodo={removeTodo}
                  />
                </li>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};
