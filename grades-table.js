document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("gradeTableBody");
  const classFilter = document.getElementById("gradeClassFilter");
  const searchInput = document.getElementById("gradeSearch");
  const averageDisplay = document.getElementById("gradeAverages");

  let grades = JSON.parse(localStorage.getItem("grades") || "[]");

  // Populate class dropdown
  const uniqueClasses = [...new Set(grades.map(g => g.class))];
  uniqueClasses.forEach(cls => {
    const option = document.createElement("option");
    option.value = cls;
    option.textContent = cls;
    classFilter.appendChild(option);
  });

  function renderAverages(filteredGrades) {
    const classScores = {};
    const subjectScores = {};

    filteredGrades.forEach(g => {
      // Class average
      if (!classScores[g.class]) classScores[g.class] = [];
      classScores[g.class].push(g.score);

      // Subject average
      if (!subjectScores[g.subject]) subjectScores[g.subject] = [];
      subjectScores[g.subject].push(g.score);
    });

    const classAvgHtml = Object.entries(classScores)
      .map(([cls, scores]) => {
        const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
        return `<li><strong>Class ${cls}:</strong> ${avg}</li>`;
      })
      .join("");

    const subjectAvgHtml = Object.entries(subjectScores)
      .map(([subj, scores]) => {
        const avg = (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1);
        return `<li><strong>${subj}:</strong> ${avg}</li>`;
      })
      .join("");

    averageDisplay.innerHTML = `
      <h3>📊 Averages</h3>
      <ul><strong>By Class:</strong> ${classAvgHtml}</ul>
      <ul><strong>By Subject:</strong> ${subjectAvgHtml}</ul>
    `;
  }

  function renderTable() {
    const selectedClass = classFilter.value;
    const search = searchInput.value.toLowerCase();

    const filteredGrades = grades.filter(g =>
      (selectedClass === "all" || g.class === selectedClass) &&
      (
        g.studentName.toLowerCase().includes(search) ||
        g.classNumber.toLowerCase().includes(search) ||
        g.subject.toLowerCase().includes(search)
      )
    );

    tableBody.innerHTML = "";

    filteredGrades.forEach((g, i) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${g.studentName}</td>
        <td>${g.class}</td>
        <td>${g.classNumber}</td>
        <td>${g.subject}</td>
        <td>${g.score}</td>
        <td><button onclick="deleteGrade(${i})">🗑️</button></td>
      `;
      tableBody.appendChild(row);
    });

    renderAverages(filteredGrades);
  }

  // Delete grade
  window.deleteGrade = (index) => {
    if (confirm("Delete this grade entry?")) {
      grades.splice(index, 1);
      localStorage.setItem("grades", JSON.stringify(grades));
      renderTable();
    }
  };

  // Listeners
  classFilter.addEventListener("change", renderTable);
  searchInput.addEventListener("input", renderTable);

  renderTable();
});