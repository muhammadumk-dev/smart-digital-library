"use client";

import { useState } from "react";
import Navbar from "../../../components/Navbar";
import { createResource } from "../../../services/resourceService";

export default function AdminResourcesPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    setLoading(true);
    setMessage("");

    try {
      const response = await createResource(formData);

      setMessage(
        response?.message ||
          "✅ Resource uploaded successfully"
      );

      form.reset();
    } catch (error) {
      console.error(error);

      setMessage(
        error.message ||
          "❌ Failed to upload resource"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      <div className="container">
        <div className="card">
          <h1>📚 Resource Management</h1>

          <p className="muted">
            Upload books, journals, projects,
            lecture notes, research papers,
            and past examination questions.
          </p>

          <form onSubmit={submit}>
            <input
              name="title"
              placeholder="Resource Title"
              required
            />

            <input
              name="author"
              placeholder="Author"
            />

            <input
              name="category"
              placeholder="Book, Journal, Project, Thesis..."
              required
            />

            <input
              name="department"
              placeholder="Department"
            />

            <input
              name="courseCode"
              placeholder="Course Code"
            />

            <input
              name="keywords"
              placeholder="Keywords separated by commas"
            />

            <textarea
              name="description"
              placeholder="Resource Description"
              rows={5}
            />

            <label>
              Upload Resource File
            </label>

            <input
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
            />

            <label>
              Upload Cover Image
            </label>

            <input
              type="file"
              name="cover"
              accept="image/*"
            />

            <button
              type="submit"
              disabled={loading}
            >
              {loading
                ? "Uploading..."
                : "Add Resource"}
            </button>
          </form>

          {message && (
            <div
              style={{
                marginTop: "15px",
                padding: "10px",
                borderRadius: "8px",
                background: "#f8fafc",
              }}
            >
              {message}
            </div>
          )}
        </div>
      </div>
    </>
  );
}