export type Todo = {
  text: string;
  complete: boolean;
};

export type ToggleComplete = (selectedTodo: Todo) => void;

export type AddTodo = (newTodo: string) => void;

export type EditTodo = (selectedTodo: Todo, newText: string) => void;
export type RemoveTodo = (selectedTodo: Todo) => void;
