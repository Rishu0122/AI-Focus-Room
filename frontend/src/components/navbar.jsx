import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-blue-400">
          🤖 AI Focus Room
        </h1>

        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>

      </div>
    </nav>
  );
}

export default Navbar;