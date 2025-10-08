import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("🚀 Form submitted", { name, email, password }); // <-- log form data

    try {
<<<<<<< HEAD
      const res = await fetch("https://website1-mcgw.onrender.com/api/signup", {
=======
      const res = await fetch("https://website1-mcgw.onrender.com", {
>>>>>>> d3391ebf80287acea440d1444078fc6ca466021c
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      console.log("📡 Response status:", res.status); // <-- log HTTP status

      const data = await res.json();
      console.log("📦 Response data:", data); // <-- log response from backend

      setMessage(data.message);
    } catch (err) {
      console.error("❌ Fetch error:", err);
      setMessage(err.message);
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex flex-col justify-center items-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          <button type="submit" className="btn">
            Sign Up
          </button>
        </form>

        {message && <p className="mt-4 text-center">{message}</p>}

        <p className="text-center text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-700 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
}
