import React, { useEffect, useState } from "react";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [sortBy, setSortBy] = useState("recent");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchProjects = async (pg = 1, sort = "recent") => {
    const res = await fetch(`http://localhost:5000/projects?page=${pg}&sort=${sort}`, {
      credentials: "include",
    });
    const data = await res.json();
    setProjects(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchProjects(page, sortBy);
  }, [page, sortBy]);

  return (
    <div>
      <h2>Projects</h2>

      <label>Sort by:</label>
      <select value={sortBy} onChange={(e) => {
        setSortBy(e.target.value);
        setPage(1);
      }}>
        <option value="recent">Recent Projects</option>
        <option value="category">Order By Category Name ASC</option>
        <option value="username">Order By Username Asc</option>
        <option value="title">Order By Project Title Asc</option>
      </select>

      <table border="1" cellPadding="8" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Project Title</th>
            <th>Username</th>
            <th>Category Name</th>
          </tr>
        </thead>
        <tbody>
          {projects.length === 0 ? (
            <tr><td colSpan="3">No data</td></tr>
          ) : (
            projects.map((p, i) => (
              <tr key={i}>
                <td>{p.project_title}</td>
                <td>{p.username}</td>
                <td>{p.category_name}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div style={{ marginTop: "20px" }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            style={{ marginRight: 5, background: page === i + 1 ? "#007bff" : "#eee", color: page === i + 1 ? "white" : "black" }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Projects;
