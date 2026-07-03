import Navbar from "../../components/Navbar";
import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Admin Panel</h1>
        <p className="muted">
          Manage library resources, users, and system analytics.
        </p>

        <div className="grid">
          <Link className="card" href="/admin/resources">
            <h3>Manage Resources</h3>
            <p>Add, update, and manage books, journals, projects, and past questions.</p>
          </Link>

          <Link className="card" href="/admin/users">
            <h3>Users</h3>
            <p>Manage students, librarians, and admin accounts.</p>
          </Link>

          <Link className="card" href="/admin/analytics">
            <h3>Analytics</h3>
            <p>View searches, downloads, most viewed resources, and platform activity.</p>
          </Link>
        </div>
      </div>
    </>
  );
}