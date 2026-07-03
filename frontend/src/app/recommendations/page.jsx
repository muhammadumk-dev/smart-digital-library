"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ResourceCard from "../../components/ResourceCard";
import { getRecommendations } from "../../services/recommendationService";

export default function Recommendations() {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        setMsg("");
        const data = await getRecommendations();
        setItems(data.recommendations || []);
      } catch (error) {
        setMsg(error.message || "Failed to load recommendations");
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Recommended Resources</h1>

        <p className="muted">
          Recommendations are generated from your department, level,
          search history, and academic interests.
        </p>

        {loading && <p>Loading recommendations...</p>}

        {msg && <p>{msg}</p>}

        {!loading && items.length === 0 && !msg && (
          <p className="muted">
            No recommendations yet. Search and view some resources first.
          </p>
        )}

        <div className="grid">
          {items.map((resource) => (
            <ResourceCard
              key={resource._id}
              resource={resource}
            />
          ))}
        </div>
      </div>
    </>
  );
}