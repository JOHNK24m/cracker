document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("teacherTableContainer");
  const searchInput = document.getElementById("searchInput");
  let teachers = JSON.parse(localStorage.getItem("teachers") || "[]");

  function renderTable(data = teachers) {
    container.querySelectorAll("table").forEach(e => e.remove());

    const table = document.createElement("table");
    table.innerHTML = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Experience</th>
          <th>Subjects</th>
          <th>Class</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${data.map((t, index) => `
          <tr>
            <td>${t.name} ${t.surname}</td>
            <td>${t.email}</td>
            <td>${t.department}</td>
            <td>${t.experience} yrs</td>
            <td>${t.subjects}</td>
            <td>${t.classAssigned}</td>
            <td>
              <button onclick="editTeacher(${index})">✏️</button>
              <button onclick="deleteTeacher(${index})">🗑️</button>
            </td>
          </tr>
        `).join("")}
      </tbody>
    `;
    container.appendChild(table);
  }

  window.deleteTeacher = (index) => {
    if (confirm("Delete this teacher?")) {
      teachers.splice(index, 1);
      localStorage.setItem("teachers", JSON.stringify(teachers));
      renderTable();
    }
  };

  window.editTeacher = (index) => {
    sessionStorage.setItem("editTeacherIndex", index);
    sessionStorage.setItem("editTeacherData", JSON.stringify(teachers[index]));
    window.location.href = "teachers.html";
  };

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      const filtered = teachers.filter(t =>
        (t.name + " " + t.surname).toLowerCase().includes(q) ||
        t.subjects.toLowerCase().includes(q) ||
        t.department.toLowerCase().includes(q) ||
        t.classAssigned.toLowerCase().includes(q)
      );
      renderTable(filtered);
    });
  }

  renderTable();
});