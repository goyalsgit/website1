// src/components/Login/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Success / error message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://website1-mcgw.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message}`); // Login success
        // Optionally, save token: localStorage.setItem("token", data.token);
      } else {
        setMessage(`❌ ${data.message}`); // Invalid credentials
      }
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-600"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-700 hover:bg-orange-800 text-white font-medium py-3 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        {message && (
          <p className="text-center text-sm mt-4">
            {message}
          </p>
        )}

        <p className="text-center text-gray-600 text-sm mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-orange-700 hover:underline font-medium">
            Sign up
          </Link>
        </p>
      </div>
    </section>
  );
}
