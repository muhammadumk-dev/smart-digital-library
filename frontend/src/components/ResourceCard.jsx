import Link from "next/link";

export default function ResourceCard({ resource }) {
  return (
    <div className="card">
      <span className="badge">
        {resource.category}
      </span>

      <h3>{resource.title}</h3>

      <p className="muted">
        {resource.author || "Unknown Author"} •{" "}
        {resource.department}
      </p>

      <p>
        {resource.description
          ? resource.description.slice(0, 120) + "..."
          : "No description available"}
      </p>

      <Link href={`/resources/${resource._id}`}>
        View Resource →
      </Link>
    </div>
  );
}