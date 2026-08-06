import { useState, useEffect } from "react";
import api from "../services/api";
import TaskCard from "../components/taskcard";
import Navbar from "../components/navbar";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [goal, setGoal] = useState("");

  const getAllTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await api.get("/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data.userfind);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await api.post(
        "/tasks/createTask",
        { goal },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setGoal("");
      getAllTasks();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <>
    <Navbar />
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto py-10 px-5">

        <h1 className="text-5xl font-bold text-center mb-10">
          AI Focus Room 🚀
        </h1>

        <div className="flex gap-3 mb-8">
          <input
            className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 outline-none focus:border-blue-500"
            type="text"
            placeholder="Enter your goal..."
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />

          <button
            onClick={handleAddTask}
            className="bg-blue-600 hover:bg-blue-700 px-6 rounded-lg font-semibold"
          >
            Add Task
          </button>
        </div>

        <div className="space-y-5">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              getAllTasks={getAllTasks}
            />
          ))}
        </div>

      </div>
    </div>
    </>
  );
}

export default Dashboard;