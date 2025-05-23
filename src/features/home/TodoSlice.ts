import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  todoText: string;
}

const initialState: TodosState = {
  todos: [],
  todoText: '',
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodoText(state, action: PayloadAction<string>) {
      state.todoText = action.payload;
    },
    addTodo(state) {
      if (state.todoText.trim()) {
        state.todos.push({ id: Date.now(), text: state.todoText, completed: false });
        state.todoText = '';
      }
    },
    toggleTodo(state, action: PayloadAction<number>) {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action: PayloadAction<number>) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
  },
});

export const { setTodoText, addTodo, toggleTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;