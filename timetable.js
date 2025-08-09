document.addEventListener("DOMContentLoaded", () => {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const tableBody = document.getElementById("timetableBody");
  const classSelect = document.getElementById("classSelect");
  const saveBtn = document.getElementById("saveBtn");

  // Load class list from student records
  function loadClassesFromStudents() {
    const students = JSON.parse(localStorage.getItem("students") || "[]");
    const classes = [...new Set(students.map(s => s.class).filter(Boolean))];
    classes.sort();
    return classes;
  }

  function populateClassDropdown() {
    const classes = loadClassesFromStudents();
    classSelect.innerHTML = "";

    if (classes.length === 0) {
      const opt = document.createElement("option");
      opt.value = "";
      opt.textContent = "No classes found";
      classSelect.appendChild(opt);
    } else {
      classes.forEach(cls => {
        const option = document.createElement("option");
        option.value = cls;
        option.textContent = cls;
        classSelect.appendChild(option);
      });
    }
  }

  function loadTimetable(className) {
    const stored = JSON.parse(localStorage.getItem("classTimetables") || "{}");
    return stored[className] || {};
  }

  function renderTimetable(className) {
    const data = loadTimetable(className);
    tableBody.innerHTML = "";

    days.forEach(day => {
      const row = document.createElement("tr");
      const dayCell = document.createElement("td");
      dayCell.textContent = day;
      row.appendChild(dayCell);

      for (let i = 0; i < 9; i++) {
        const cell = document.createElement("td");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = `P${i + 1}`;
        input.dataset.day = day;
        input.dataset.period = i;
        input.value = data[day]?.[i] || "";
        cell.appendChild(input);
        row.appendChild(cell);
      }

      tableBody.appendChild(row);
    });
  }

  saveBtn.addEventListener("click", () => {
    const className = classSelect.value;
    const timetable = {};

    document.querySelectorAll("#timetableBody input").forEach(input => {
      const day = input.dataset.day;
      const period = +input.dataset.period;
      if (!timetable[day]) timetable[day] = [];
      timetable[day][period] = input.value.trim();
    });

    const allData = JSON.parse(localStorage.getItem("classTimetables") || "{}");
    allData[className] = timetable;
    localStorage.setItem("classTimetables", JSON.stringify(allData));
    alert("✅ Timetable saved for " + className);
  });

  classSelect.addEventListener("change", () => {
    renderTimetable(classSelect.value);
  });

  // Initialize
  populateClassDropdown();
  if (classSelect.value) {
    renderTimetable(classSelect.value);
  }
});