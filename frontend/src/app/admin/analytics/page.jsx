"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import { getAnalytics } from "../../../services/analyticsService";

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const data = await getAnalytics();
        setAnalytics(data.analytics);
      } catch (err) {
        setError(
          err.message || "Failed to load analytics"
        );
      } finally {
        setLoading(false);
      }
    }

    loadAnalytics();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Library Analytics</h1>

        <p className="muted">
          Monitor system usage, resource engagement,
          searches, and downloads.
        </p>

        {loading && <p>Loading analytics...</p>}

        {error && <p>{error}</p>}

        {analytics && (
          <div className="grid">
            <div className="card">
              <h2>{analytics.users || 0}</h2>
              <p>Total Users</p>
            </div>

            <div className="card">
              <h2>{analytics.resources || 0}</h2>
              <p>Total Resources</p>
            </div>

            <div className="card">
              <h2>{analytics.searches || 0}</h2>
              <p>Total Searches</p>
            </div>

            <div className="card">
              <h2>{analytics.downloads || 0}</h2>
              <p>Total Downloads</p>
            </div>

            <div className="card">
              <h2>{analytics.views || 0}</h2>
              <p>Total Views</p>
            </div>

            <div className="card">
              <h2>{analytics.activeUsers || 0}</h2>
              <p>Active Users</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}