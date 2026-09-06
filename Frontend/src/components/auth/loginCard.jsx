import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const LoginCard = ({ onClose, onSwitch }) => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    if (error) {
      setError("");
    }
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    const data = await login(formData);

    if (data.success) {
      const from = location.state?.from;

      const destination = from
        ? `${from.pathname}${from.search}${from.hash}`
        : "/dashboard";

      onClose();

      navigate(destination, {
        replace: true,
      });
    } else {
      setError(data.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md bg-white/10 border border-white/20 backdrop-blur-xl rounded-3xl p-8 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-400 hover:text-white"
      >
        ✕
      </button>

      <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 border border-white/20 outline-none"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {error && <p className="text-red-400 text-sm text-center"> {error} </p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        Don’t have an account?
        <button onClick={onSwitch} className="ml-2 text-white font-semibold">
          Signup
        </button>
      </p>
    </div>
  );
};

export default LoginCard;
