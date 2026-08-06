import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name:"",
      email: "",
      password: "",
      mobilenumber:""
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
    const response = await api.post("/users/register", formData);

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
          Create your account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="block text-sm mb-2 text-slate-300">
            Name
          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500 transition"
          />
        </div>

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
            Mobile Number
          </label>

          <input
            type="text"
            name="mobilenumber"
            placeholder="Enter your mobile number"
            value={formData.mobilenumber}
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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white outline-none focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-3 rounded-lg font-semibold transition duration-300"
        >
          Register
        </button>

      </form>

      <p className="text-center text-slate-400 mt-6">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="text-blue-400 cursor-pointer hover:underline"
        >
          Login
        </span>
      </p>

    </div>
  </div>
);
}

export default Register;