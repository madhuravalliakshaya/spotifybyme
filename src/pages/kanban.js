import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";

export default function Kanban() {
  const [tasks, setTasks] = useState({
    todo: [],
    ongoing: [],
    completed: [],
  });

  const [input, setInput] = useState("");


  useEffect(() => {
    const saved = localStorage.getItem("kanban");
    if (saved) setTasks(JSON.parse(saved));
  }, []);


  useEffect(() => {
    localStorage.setItem("kanban", JSON.stringify(tasks));
  }, [tasks]);

 
  function handleAdd() {
    if (!input.trim()) return;

    const newTask = {
     id: Date.now().toString() + Math.random().toString(36).substring(2, 9),

      text: input,
    };

    setTasks((prev) => ({
      ...prev,
      todo: [...prev.todo, newTask],
    }));

    setInput("");
  }

  function handleDelete(colId, taskId) {
    setTasks((prev) => ({
      ...prev,
      [colId]: prev[colId].filter((task) => task.id !== taskId),
    }));
  }

 
  function handleDragEnd(result) {
    const { source, destination } = result;
    if (!destination) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    const sourceItems = Array.from(tasks[sourceCol]);
    const destItems = Array.from(tasks[destCol]);

    const [moved] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, moved);

    setTasks({
      ...tasks,
      [sourceCol]: sourceItems,
      [destCol]: destItems,
    });
  }

  const columns = [
    { id: "todo", title: "To-Do", color: "bg-red-100" },
    { id: "ongoing", title: "Ongoing", color: "bg-yellow-100" },
    { id: "completed", title: "Completed", color: "bg-green-100" },
  ];

  return (
    <div className="p-6">
      {/* ADD INPUT */}
      <div className="flex gap-2 mb-6">
        <input
          className="border p-2 flex-1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task..."
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white px-4 py-2"
        >
          Add
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-4">

          {columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided) => (
                <div
                  className={`p-4 rounded ${col.color} min-h-[300px]`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="font-bold text-lg mb-3">{col.title}</h2>

                  {tasks[col.id].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          className="p-3 bg-white shadow rounded mb-3 flex justify-between items-center"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <span>{task.text}</span>

                          <button
                            onClick={() => handleDelete(col.id, task.id)}
                            className="text-red-500 font-bold"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}

        </div>
      </DragDropContext>
    </div>
  );
}


