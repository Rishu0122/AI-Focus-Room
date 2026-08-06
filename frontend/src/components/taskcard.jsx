import { useState } from "react";
import api from "../services/api";

function TaskCard({ task, getAllTasks }) {
  const [goal, setGoal] = useState(task.goal);
  const [isEditing, setIsEditing] = useState(false);

  const deleteTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.delete(`/tasks/${task._id}/deleteTask`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.put(
        `/tasks/${task._id}/updateTask`,
        {
          goal: goal,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsEditing(false);
      getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const startFocus = async () => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      `/tasks/${task._id}/start`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getAllTasks();
  } catch (error) {
    console.log(error);
  }
};

  const endFocus = async () => {
    try{
      const token = localStorage.getItem("token");

    await api.post(
      `/tasks/${task._id}/end`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getAllTasks();
    }catch(error) {
      console.log(error.response.data);
    }
  }

  const completeSubtask = async (subtaskId) => {
  try {
    const token = localStorage.getItem("token");

    await api.post(
      `/tasks/${task._id}/subtasks/${subtaskId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    getAllTasks();

  } catch (error) {
    console.log(error.response?.data);
  }
};

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700 hover:border-blue-500 transition-all">
      {isEditing ? (
        <>
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <br />
          <br />

          <button onClick={editTask}>Save</button>

          <button onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-3">
  {task.goal}
</h2>

          <p className="mb-4">
  Status :
  <span
    className={`ml-2 px-3 py-1 rounded-full text-sm ${
      task.status === "in-progress"
        ? "bg-green-500"
        : "bg-yellow-500"
    }`}
  >
    {task.status}
  </span>
</p>

          <p className="text-slate-300 mb-5">
  📌 Total Subtasks : {task.subtasks.length}
</p>

          <div className="flex gap-3 flex-wrap">

  {task.status === "in-progress" ? (
    <button
      onClick={endFocus}
      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
    >
      End Focus
    </button>
  ) : (
    <button
      onClick={startFocus}
      className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-lg"
    >
      Start Focus
    </button>
  )}

  <button
    onClick={() => setIsEditing(true)}
    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg"
  >
    Edit
  </button>

  <button
    onClick={deleteTask}
    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
  >
    Delete
  </button>

</div>

    <div className="mt-5">
  <h3 className="text-lg font-semibold mb-3">
    📋 Subtasks
  </h3>

  {task.subtasks.map((subtask, index) => (
    <div
      key={subtask._id}
      className="flex items-center gap-3 mb-2"
    >
      <input
  type="checkbox"
  checked={subtask.completed}
  onChange={() => completeSubtask(subtask._id)}
  className="w-5 h-5 cursor-pointer"
/>

      <span
        className={
          subtask.completed
            ? "line-through text-gray-400"
            : ""
        }
      >
        {index + 1}. {subtask.title}
      </span>
    </div>
  ))}
</div>
        </>
      )}
        
    </div>
  );
}

export default TaskCard;