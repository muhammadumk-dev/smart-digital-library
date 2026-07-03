"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { registerUser, saveSession } from "../../services/authService";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    department: "",
    level: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function submit(e) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = await registerUser(form);
      saveSession(data);
      window.location.href = "/dashboard";
    } catch (error) {
      setMessage(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Create Student Account</h2>

          <p className="muted">
            Register to access digital resources and receive intelligent
            academic recommendations.
          </p>

          <form onSubmit={submit}>
            <input
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />

            <input
              name="department"
              placeholder="Department"
              value={form.department}
              onChange={handleChange}
              required
            />

            <input
              name="level"
              placeholder="Level e.g. 100, 200, 300, 400"
              value={form.level}
              onChange={handleChange}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Creating Account..." : "Register"}
            </button>
          </form>

          {message && <p>{message}</p>}

          <p className="muted">
            Already have an account? <Link href="/login">Login here</Link>
          </p>
        </div>
      </div>
    </>
  );
}