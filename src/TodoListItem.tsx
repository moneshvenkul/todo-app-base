import React, { useState } from "react";
import { Todo, ToggleComplete, EditTodo, RemoveTodo } from "./types";
import "./TodoListItem.css";

interface TodoListItemProps {
  todo: Todo;
  toggleComplete: ToggleComplete;
  editTodo: EditTodo;
  removeTodo: RemoveTodo;
}

export const TodoListItem: React.FC<TodoListItemProps> = ({
  todo,
  toggleComplete,
  editTodo,
  removeTodo,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedText, setEditedText] = useState<string>(todo.text);

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedText(e.target.value);
    };
    
    const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    editTodo(todo, editedText);
    setIsEditing(false);
    };
    
    return (
      <li className="todo-item">
      <label className={todo.complete ? "complete" : undefined}>
        <input
          type="checkbox"
          onChange={() => toggleComplete(todo)}
          checked={todo.complete}
        />
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={handleEditChange}
            className="todo-text"
          />
        ) : (
          <span className="todo-text">{editedText}</span>
        )}
      </label>
      <div className="todo-actions">
        <button
          className="todo-button edit-button"
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? "Save" : "Edit"}
        </button>
        <button
          className="todo-button delete-button"
          onClick={() => removeTodo(todo)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};
