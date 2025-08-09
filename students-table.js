document.addEventListener("DOMContentLoaded", () => {
  let students = JSON.parse(localStorage.getItem("students") || "[]");
  const classes = JSON.parse(localStorage.getItem("classes") || "[]");
  const container = document.getElementById("classGroupContainer");
  const searchInput = document.getElementById("searchInput");

  function saveAndRefresh(newList) {
    localStorage.setItem("students", JSON.stringify(newList));
    students = newList;
    renderTables(students);
  }

  function renderTables(data = students) {
    container.querySelectorAll(".class-table").forEach(e => e.remove());

    const grouped = {};
    data.forEach((student, index) => {
      const className = student.class || "Unassigned";
      if (!grouped[className]) grouped[className] = [];
      grouped[className].push({ ...student, index });
    });

    Object.keys(grouped).forEach(className => {
      const classInfo = classes.find(c => c.name === className);
      const groupDiv = document.createElement("div");
      groupDiv.className = "class-table";

      groupDiv.innerHTML = `
        <h2>${className} ${classInfo ? `- ${classInfo.teacher}` : ""}</h2>
        <table>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Age</th>
              <th>Class No.</th>
              <th>Grade</th>
              <th>Email</th>
              <th>Parent Contact</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            ${grouped[className].map(s => `
              <tr>
                <td>${s.name} ${s.surname}</td>
                <td>${s.age}</td>
                <td>${s.classNumber || '-'}</td>
                <td>${s.grade}</td>
                <td>${s.email}</td>
                <td>${s.parentContact}</td>
                <td>${s.address}</td>
                <td>
                  <button onclick="editStudent(${s.index})">✏️</button>
                  <button onclick="deleteStudent(${s.index})">🗑️</button>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;

      container.appendChild(groupDiv);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      const q = searchInput.value.toLowerCase();
      const filtered = students.filter(s =>
        (s.name + " " + s.surname).toLowerCase().includes(q) ||
        (s.class || "").toLowerCase().includes(q) ||
        (s.classNumber || "").toLowerCase().includes(q)
      );
      renderTables(filtered);
    });
  }

  window.deleteStudent = (index) => {
    if (confirm("Delete this student?")) {
      const updated = [...students];
      updated.splice(index, 1);
      saveAndRefresh(updated);
    }
  };

  window.editStudent = (index) => {
    const student = students[index];
    sessionStorage.setItem("editStudentIndex", index);
    sessionStorage.setItem("editStudentData", JSON.stringify(student));
    window.location.href = "students.html";
  };

  renderTables();
});