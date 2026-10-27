import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slices/todoSlice";

const STORAGE_KEY = "action-plan-todos";

const loadTodos = () => {
  try {
    const storedTodos = window.localStorage.getItem(STORAGE_KEY);
    const todos = storedTodos ? JSON.parse(storedTodos) : [];

    return Array.isArray(todos) ? todos : [];
  } catch {
    return [];
  }
};

const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
  preloadedState: {
    todos: { todos: loadTodos() },
  },
});

store.subscribe(() => {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(store.getState().todos.todos),
    );
  } catch {
    // Keep the app usable when storage is unavailable or full.
  }
});

export default store;
