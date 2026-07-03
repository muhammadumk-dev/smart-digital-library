"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import { getUser } from "../../services/authService";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = getUser();

    if (!savedUser) {
      window.location.href = "/login";
      return;
    }

    setUser(savedUser);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="dashboard-hero">
          <div>
            <span className="badge">Smart Library Workspace</span>

            <h1>
              Welcome back, {user?.name || "Student"} 👋
            </h1>

            <p>
              Discover books, journals, past questions, research papers,
              projects, and intelligent recommendations built around your
              academic interest.
            </p>

            <div className="row">
              <Link href="/resources">
                <button>Browse Resources</button>
              </Link>

              <Link href="/recommendations">
                <button className="btn-light">
                  View AI Recommendations
                </button>
              </Link>
            </div>
          </div>

          <div className="card dashboard-profile">
            <h3>My Academic Profile</h3>

            <p>
              <strong>Name:</strong> {user?.name || "Not available"}
            </p>

            <p>
              <strong>Department:</strong>{" "}
              {user?.department || "Not available"}
            </p>

            <p>
              <strong>Level:</strong> {user?.level || "Not available"}
            </p>

            <p>
              <strong>Role:</strong> {user?.role || "Student"}
            </p>
          </div>
        </div>

        <div className="grid">
          <div className="card stat-card">
            <h2>📚</h2>
            <h3>Digital Resources</h3>
            <p>
              Access books, journals, lecture notes, projects, and academic
              papers from one place.
            </p>
          </div>

          <div className="card stat-card">
            <h2>🤖</h2>
            <h3>AI Recommendations</h3>
            <p>
              Get suggested materials based on your department, searches,
              downloads, and learning interests.
            </p>
          </div>

          <div className="card stat-card">
            <h2>🔍</h2>
            <h3>Smart Search</h3>
            <p>
              Search by title, author, keyword, course code, category, or
              department.
            </p>
          </div>

          <div className="card stat-card">
            <h2>📈</h2>
            <h3>Learning Activity</h3>
            <p>
              Track viewed resources, downloads, and trending academic
              materials.
            </p>
          </div>
        </div>

        <div className="section-header">
          <h2>Quick Actions</h2>
          <p>
            Start using the Smart Digital Library with one click.
          </p>
        </div>

        <div className="grid">
          <Link className="card action-card" href="/resources">
            <h3>Browse Library →</h3>
            <p>
              Explore all available academic materials uploaded by the library.
            </p>
          </Link>

          <Link className="card action-card" href="/recommendations">
            <h3>Open Recommendations →</h3>
            <p>
              View resources selected for you by the recommendation engine.
            </p>
          </Link>

          <Link className="card action-card" href="/profile">
            <h3>View Profile →</h3>
            <p>
              Check your academic details and account information.
            </p>
          </Link>

          {user?.role !== "student" && (
            <Link className="card action-card" href="/admin">
              <h3>Admin Panel →</h3>
              <p>
                Manage resources, users, downloads, searches, and analytics.
              </p>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}