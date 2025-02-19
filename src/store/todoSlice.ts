import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Task = { id: number; text: string; completed: boolean };

const todoSlice = createSlice({
  name: "todos",
  initialState: [] as Task[],
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.push({ id: Date.now(), text: action.payload, completed: false });
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    removeTask: (state, action: PayloadAction<number>) => {
      return state.filter((t) => t.id !== action.payload);
    },
  },
});

export const { addTask, toggleTask, removeTask } = todoSlice.actions;
export default todoSlice.reducer;
