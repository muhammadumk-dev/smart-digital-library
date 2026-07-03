"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      // Backend endpoint can be added later
      setMessage(
        "If this email exists, password reset instructions will be sent."
      );
      setEmail("");
    } catch (error) {
      setMessage(error.message || "Failed to process request");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h2>Forgot Password</h2>

          <p className="muted">
            Enter your email address to request a password reset.
          </p>

          <form onSubmit={submit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Processing..." : "Send Reset Link"}
            </button>
          </form>

          {message && <p>{message}</p>}

          <p className="muted">
            Remember password? <Link href="/login">Login</Link>
          </p>

          <p className="muted">
            <Link href="/">← Back to Home Page</Link>
          </p>
        </div>
      </div>
    </>
  );
}