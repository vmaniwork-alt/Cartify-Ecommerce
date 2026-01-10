// FILE: frontend/src/pages/Login.jsx

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Loader from "../components/Loader";

const BRAND = "blue"; // blue | cyan | green

const brandClasses = {
  blue: {
    ring: "focus:ring-blue-400",
    bg: "bg-blue-600 hover:bg-blue-700",
    text: "text-blue-600",
  },
  cyan: {
    ring: "focus:ring-cyan-400",
    bg: "bg-cyan-600 hover:bg-cyan-700",
    text: "text-cyan-600",
  },
  green: {
    ring: "focus:ring-green-400",
    bg: "bg-green-600 hover:bg-green-700",
    text: "text-green-600",
  },
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      await login(email, password);
      navigate("/");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const brand = brandClasses[BRAND];

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8"
      >
        {/* HEADER */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your Cartify account
        </p>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 text-sm px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <div className="relative mb-4">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full border px-4 py-3 pl-11 rounded-lg
              focus:ring-2 ${brand.ring} focus:outline-none`}
          />
        </div>

        {/* PASSWORD */}
        <div className="relative mb-5">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full border px-4 py-3 pl-11 rounded-lg
              focus:ring-2 ${brand.ring} focus:outline-none`}
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2
            ${brand.bg} text-white py-3 rounded-lg
            font-semibold transition disabled:opacity-60`}
        >
          {loading ? <Loader /> : "Login"}
        </button>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className={`${brand.text} font-medium hover:underline`}>
            Create one
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
