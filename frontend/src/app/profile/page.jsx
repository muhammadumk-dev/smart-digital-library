"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getUser, logout } from "../../services/authService";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getUser();

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(savedUser);
  }, []);

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="container">
          <p>Loading profile...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>My Profile</h1>

        <p className="muted">
          View your account information and academic details.
        </p>

        <div className="grid">
          <div className="card">
            <h3>Account Information</h3>

            <p>
              <strong>Name:</strong> {user.name || "Not provided"}
            </p>

            <p>
              <strong>Email:</strong> {user.email || "Not provided"}
            </p>

            <p>
              <strong>Role:</strong> {user.role || "Student"}
            </p>
          </div>

          <div className="card">
            <h3>Academic Information</h3>

            <p>
              <strong>Department:</strong>{" "}
              {user.department || "Not provided"}
            </p>

            <p>
              <strong>Level:</strong> {user.level || "Not provided"}
            </p>
          </div>

          <div className="card">
            <h3>Library Activity</h3>

            <p className="muted">
              Your viewed resources, downloads, and recommendations will appear
              here in the next update.
            </p>
          </div>

          <div className="card">
            <h3>Account Action</h3>

            <button onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
    </>
  );
}