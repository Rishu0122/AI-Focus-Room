import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/login", formData);

    localStorage.setItem("token", response.data.token);

    navigate("/dashboard"); // 👈 Ye line yahan

  } catch (error) {
    console.log(error);
  }
};

  return (
  <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">

      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-400">
          🤖 AI Focus Room
        </h1>

        <p className="text-slate-400 mt-2">
          Organize • Focus • Achieve
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm mb-2 text-slate-300">
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-slate-300">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition duration-300"
        >
          Login
        </button>

      </form>

      <p className="text-center text-slate-400 mt-6">
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Register
        </span>
      </p>

    </div>
  </div>
);
};

export default Login;