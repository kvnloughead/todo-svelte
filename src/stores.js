import { writable } from 'svelte/store';
import { localStore } from './localStore';

export const alert = writable('Welcome to the todo list app!');

const initialTodos = [
  { id: 1, name: 'Add a todo to get started', completed: true },
  { id: 2, name: 'Test out the features', completed: false },
  { id: 3, name: 'Complete rest of tutorial', completed: false },
];

export const todos = localStore('todos', initialTodos);
