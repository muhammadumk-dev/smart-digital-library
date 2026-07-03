"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";
import {
  getResource,
  downloadResource,
} from "../../../services/resourceService";

export default function ResourceDetails({ params }) {
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    async function loadResource() {
      try {
        const data = await getResource(params.id);
        setResource(data.resource);
      } catch (error) {
        setMsg(
          error.message || "Failed to load resource"
        );
      } finally {
        setLoading(false);
      }
    }

    loadResource();
  }, [params.id]);

  async function download() {
    try {
      const data = await downloadResource(params.id);

      if (!data.fileUrl) {
        alert("No file attached to this resource");
        return;
      }

      const backendURL =
        process.env.NEXT_PUBLIC_API_URL?.replace(
          "/api",
          ""
        ) || "http://127.0.0.1:5000";

      const downloadURL =
        data.fileUrl.startsWith("http")
          ? data.fileUrl
          : `${backendURL}${data.fileUrl}`;

      window.open(downloadURL, "_blank");
    } catch (error) {
      alert(
        error.message ||
          "Failed to download resource"
      );
    }
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="container">
          <p>Loading resource...</p>
        </div>
      </>
    );
  }

  if (msg) {
    return (
      <>
        <Navbar />
        <div className="container">
          <div className="card">
            <p>{msg}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <span className="badge">
            {resource.category}
          </span>

          <h1>{resource.title}</h1>

          <p className="muted">
            {resource.author || "Unknown Author"} •{" "}
            {resource.department} •{" "}
            {resource.courseCode}
          </p>

          <p>{resource.description}</p>

          <p className="muted">
            Views: {resource.views || 0} |
            Downloads: {resource.downloads || 0}
          </p>

          <button onClick={download}>
            Download Resource
          </button>
        </div>
      </div>
    </>
  );
}