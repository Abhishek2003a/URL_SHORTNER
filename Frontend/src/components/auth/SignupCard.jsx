import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const SignupCard = ({ onClose, onSwitch }) => {
  const { signup, loading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await signup(formData);

    if (data.success) {
      onClose();
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

      <h2 className="text-3xl font-bold mb-6 text-center">Create Account</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 outline-none"
        />

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
        >
          {loading ? "Creating..." : "Signup"}
        </button>
      </form>

      <p className="text-center text-gray-400 mt-6">
        Already have an account?
        <button onClick={onSwitch} className="ml-2 text-white font-semibold">
          Login
        </button>
      </p>
    </div>
  );
};

export default SignupCard;
