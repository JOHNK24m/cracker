document.addEventListener("DOMContentLoaded", () => {
  const classSelect = document.getElementById("classSelectView");
  const viewTableBody = document.getElementById("viewTimetableBody");
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  // Get all classes from students
  function getClassList() {
    const students = JSON.parse(localStorage.getItem("students") || "[]");
    const classes = [...new Set(students.map(s => s.class).filter(Boolean))];
    classes.sort();
    return classes;
  }

  // Load class dropdown
  function loadDropdown() {
    const classes = getClassList();
    classSelect.innerHTML = "";
    classes.forEach(cls => {
      const option = document.createElement("option");
      option.value = cls;
      option.textContent = cls;
      classSelect.appendChild(option);
    });
  }

  // Load timetable from localStorage
  function loadTimetable(className) {
    const all = JSON.parse(localStorage.getItem("classTimetables") || "{}");
    return all[className] || {};
  }

  function renderTable(className) {
    const data = loadTimetable(className);
    viewTableBody.innerHTML = "";

    days.forEach(day => {
      const row = document.createElement("tr");
      const dayCell = document.createElement("td");
      dayCell.textContent = day;
      row.appendChild(dayCell);

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("td");
        cell.textContent = data[day]?.[i] || "-";
        row.appendChild(cell);
      }

      viewTableBody.appendChild(row);
    });
  }

  // Change class listener
  classSelect.addEventListener("change", () => {
    renderTable(classSelect.value);
  });

  loadDropdown();
  if (classSelect.value) {
    renderTable(classSelect.value);
  }
});