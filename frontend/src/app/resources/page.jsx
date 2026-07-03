"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import ResourceCard from "../../components/ResourceCard";
import { getResources } from "../../services/resourceService";

export default function ResourcesPage() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function load(term = "") {
    try {
      setLoading(true);
      setMsg("");

      const data = await getResources(term);
      setItems(data.resources || []);
    } catch (err) {
      setMsg(err.message || "Failed to load resources");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Library Resources</h1>
        <p className="muted">
          Search books, journals, past questions, projects, and academic papers.
        </p>

        <div className="row">
          <input
            placeholder="Search books, journals, past questions..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />

          <button onClick={() => load(q)} disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {msg && <p>{msg}</p>}

        <div className="grid">
          {items.map((resource) => (
            <ResourceCard key={resource._id} resource={resource} />
          ))}
        </div>

        {!loading && items.length === 0 && (
          <p className="muted">No resources found.</p>
        )}
      </div>
    </>
  );
}