import { useAuth } from "../../contexts/AuthContext";

const Navbar = ({ onLogin, onSignup }) => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-5">
      <h1 className="text-2xl font-bold tracking-wide">
        Smart<span className="text-gray-400">Shortener</span>
      </h1>

      {!isAuthenticated ? (
        <div className="flex gap-3">
          <button
            onClick={onLogin}
            className="px-5 py-2 rounded-xl border border-white/20 bg-white/10 backdrop-blur hover:bg-white/20 transition duration-300"
          >
            Login
          </button>

          <button
            onClick={onSignup}
            className="px-5 py-2 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition duration-300"
          >
            Signup
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <p className="text-gray-300 capitalize">
            {(user?.username || user?.userName || "User").split(" ")[0]}
          </p>

          <button
            onClick={logout}
            className="px-5 py-2 rounded-xl bg-red-500/20 border border-red-500/30 hover:bg-red-500/30 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
