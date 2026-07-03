"use client";

import { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with API call later
    setTimeout(() => {
      setUsers([
        {
          id: 1,
          name: "Muhammad Kamilu",
          email: "muhammad@example.com",
          role: "Student",
          department: "Software Engineering",
        },
        {
          id: 2,
          name: "Library Admin",
          email: "admin@library.com",
          role: "Librarian",
          department: "Library Unit",
        },
      ]);

      setLoading(false);
    }, 500);
  }, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Users Management</h1>

        <p className="muted">
          Manage students, librarians, and administrators.
        </p>

        <div className="card">
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Department</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>{user.department}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}