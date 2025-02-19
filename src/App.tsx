import { useState, KeyboardEvent } from "react"; // Importe KeyboardEvent
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { addTask, toggleTask, removeTask } from "./store/todoSlice";

export default function App() {
  const [taskText, setTaskText] = useState("");
  const [removingTaskId, setRemovingTaskId] = useState<number | null>(null);
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todos);

  const handleKeyPress = (e: KeyboardEvent) => { // Adicione este handler
    if (e.key === 'Enter' && taskText.trim()) {
      dispatch(addTask(taskText));
      setTaskText("");
    }
  };

  const handleRemoveTask = (id: number) => {
    setRemovingTaskId(id);
    setTimeout(() => {
      dispatch(removeTask(id));
      setRemovingTaskId(null);
    }, 500);
  };

  return (
    <main>
      <h1>Lista Rápida</h1>

      <div className="input-container">
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          onKeyDown={handleKeyPress} // Adicione esta prop
          placeholder="Adicione um novo item"
        />
        <button 
          onClick={() => { 
            if (taskText.trim()) { // Validação extra para evitar tasks vazias
              dispatch(addTask(taskText)); 
              setTaskText(""); 
            }
          }}
        >
          Adicionar
        </button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li
            key={task.id}
            className={`${removingTaskId === task.id ? "fade-out" : ""} ${task.completed ? "completed" : ""}`}
          >
            <span>{task.text}</span>
            <button onClick={() => dispatch(toggleTask(task.id))}>
              ✔
            </button>
            <button onClick={() => handleRemoveTask(task.id)}>
              ❌
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}