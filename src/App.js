import { useState, useEffect } from "react";
import "./App.css";
function App() {


  const [task, settask] = useState("");
  const [alltasks, setalltasks] = useState([]);
  const [filteretasks, setfilteredtasks] = useState([]);
  const [filter, setfilter] = useState("all");

  useEffect(() => {
    const data = localStorage.getItem("tasks");
    if (data) {
      setalltasks(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(alltasks));
    if (filter === "all") setfilteredtasks(alltasks);
    if (filter === "completed")
      setfilteredtasks(alltasks.filter((t) => t.completed));
    if (filter === "incomplete")
      setfilteredtasks(alltasks.filter((t) => !t.completed));
  }, [alltasks, filter]);

  function addTask() {
    if (task.trim() === "") return;

    let prev = alltasks.length !== 0 ? alltasks[alltasks.length - 1].id : 0;

    setalltasks([
      ...alltasks,
      { id: prev + 1, name: task, completed: false },
    ]);

    settask("");
  }

  function showall() {
    setfilter("all");
  }
  function showcom() {
    setfilter("completed");
  }
  function showun() {
    setfilter("incomplete");
  }

  function deleteTask(id) {
    setalltasks(alltasks.filter((t) => t.id !== id));
  }

  function markCompleted(id) {
    const updated = alltasks.map((t) =>
      t.id === id ? { ...t, completed: true } : t
    );
    setalltasks(updated);
  }

  const tasksToShow = filteretasks;

  return (
    <div>
      <header><h1>To-Do List</h1></header>
    <div className="App">
      <div className="intr">
      <input
        placeholder="Add task"
        value={task}
        onChange={(e) => settask(e.target.value)}
      />

      <button onClick={addTask}>+</button></div>
      <div className="filter-btns">
      
        <button onClick={showall}>All</button>
        <button onClick={showcom}>Completed</button>
        <button onClick={showun}>Incomplete</button>
      </div>
<div className="tasklist">
      {tasksToShow.map((t) => (
        <div key={t.id}>
          <h1 style={{ textDecoration: t.completed ? "line-through" : "none" }}>
            {t.name}
          </h1>
<div className="taskbuttons">
          {!t.completed && (
            <button className="completed" onClick={() => markCompleted(t.id)}>✔</button>
          )}

          <button className="delete-btn" onClick={() => deleteTask(t.id)}>X</button>
        </div>
        </div>
      ))}
</div>
      
    </div>
    </div>
  );
}

export default App;
