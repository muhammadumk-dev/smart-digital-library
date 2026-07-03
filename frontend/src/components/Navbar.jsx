"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser, logout } from "../services/authService";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUser());
  }, []);

  return (
    <nav className="nav">
      <Link href="/" className="brand">
        Smart Library
      </Link>

      <Link href="/dashboard">Dashboard</Link>

      <Link href="/resources">Resources</Link>

      <Link href="/recommendations">
        AI Recommendations
      </Link>

      <Link href="/profile">
        Profile
      </Link>

      {(user?.role === "admin" ||
        user?.role === "librarian") && (
        <Link href="/admin">
          Admin
        </Link>
      )}

      {user ? (
        <button
          style={{ width: "auto" }}
          onClick={logout}
        >
          Logout
        </button>
      ) : (
        <Link href="/login">
          Login
        </Link>
      )}
    </nav>
  );
}