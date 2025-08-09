document.addEventListener("DOMContentLoaded", () => {
  const classForm = document.getElementById("classForm");
  const classTableBody = document.getElementById("classTableBody");
  let classList = JSON.parse(localStorage.getItem("classes")) || [];

  function saveClasses() {
    localStorage.setItem("classes", JSON.stringify(classList));
  }

  function renderTable() {
    classTableBody.innerHTML = "";
    classList.forEach((cls, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cls.name}</td>
        <td>${cls.teacher}</td>
        <td>${cls.subject || '-'}</td>
        <td>${cls.room || '-'}</td>
        <td>
          <button onclick="editClass(${index})">✏️</button>
          <button onclick="deleteClass(${index})">🗑️</button>
        </td>
      `;
      classTableBody.appendChild(row);
    });
  }

  classForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newClass = {
      name: document.getElementById("className").value.trim(),
      teacher: document.getElementById("teacherName").value.trim(),
      subject: document.getElementById("subject").value.trim(),
      room: document.getElementById("room").value.trim()
    };

    const index = document.getElementById("classIndex").value;
    if (index === "") {
      classList.push(newClass);
    } else {
      classList[index] = newClass;
      document.getElementById("classIndex").value = "";
    }

    saveClasses();
    renderTable();
    classForm.reset();
  });

  window.editClass = (index) => {
    const cls = classList[index];
    document.getElementById("classIndex").value = index;
    document.getElementById("className").value = cls.name;
    document.getElementById("teacherName").value = cls.teacher;
    document.getElementById("subject").value = cls.subject;
    document.getElementById("room").value = cls.room;
  };

  window.deleteClass = (index) => {
    if (confirm("Delete this class?")) {
      classList.splice(index, 1);
      saveClasses();
      renderTable();
    }
  };

  renderTable();
});