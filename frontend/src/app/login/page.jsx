"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { loginUser, saveSession } from "../../services/authService";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setLoading(true);
    setMsg("");

    try {
      const data = await loginUser(form);

      saveSession(data);

      window.location.href = "/dashboard";
    } catch (err) {
      setMsg(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Login</h2>

          <p className="muted">
            Access your Smart Digital Library account.
          </p>

          <form onSubmit={submit}>
            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              required
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>
          </form>

          {msg && (
            <p style={{ color: "red" }}>
              {msg}
            </p>
          )}

          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Link href="/forgot-password">
              Forgot Password?
            </Link>

            <Link href="/register">
              Create New Account
            </Link>

            <Link href="/">
              ← Back to Home Page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}