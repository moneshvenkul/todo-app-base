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
    <li>
    {isEditing ? (
    <form onSubmit={handleEditSubmit}>
    <input
             type="text"
             value={editedText}
             onChange={handleEditChange}
           />
    <button type="submit">Save</button>
    <button onClick={() => setIsEditing(false)}>Cancel</button>
    </form>
    ) : (
    <>
    <label className={todo.complete ? "complete" : undefined}>
    <input
    type="checkbox"
    onChange={() => toggleComplete(todo)}
    checked={todo.complete}
    />
    {todo.text}
    </label>
    <button onClick={() => setIsEditing(true)}>Edit</button>
    <button onClick={() => removeTodo(todo)}>Delete</button>
    </>
    )}
    </li>
    );
    };
