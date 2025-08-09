document.addEventListener("DOMContentLoaded", () => {
  const classSelect = document.getElementById("reportClassSelect");
  const attendanceBody = document.getElementById("attendanceReportBody");
  const feeBody = document.getElementById("feeReportBody");

  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const attendance = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");
  const fees = JSON.parse(localStorage.getItem("fees") || "[]");

  // 🔁 Fill class dropdown
  const classSet = new Set(students.map(s => s.class).filter(Boolean));
  classSet.forEach(cls => {
    const opt = document.createElement("option");
    opt.value = cls;
    opt.textContent = cls;
    classSelect.appendChild(opt);
  });

  // 📊 Generate Attendance Table
  function renderAttendance(selectedClass) {
    attendanceBody.innerHTML = "";

    students
      .filter(s => selectedClass === "all" || s.class === selectedClass)
      .forEach(student => {
        let total = 0;
        let present = 0;

        attendance.forEach(entry => {
          const status = entry.status?.[student.class + "-" + student.classNumber];
          if (status) {
            total++;
            if (status === "present") present++;
          }
        });

        const percent = total ? Math.round((present / total) * 100) : 0;

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.name} ${student.surname}</td>
          <td>${student.class}</td>
          <td>${student.classNumber}</td>
          <td>${present}</td>
          <td>${total}</td>
          <td>${percent}%</td>
        `;
        attendanceBody.appendChild(row);
      });
  }

  // 💰 Generate Fee Report
  function renderFees(selectedClass) {
    feeBody.innerHTML = "";

    students
      .filter(s => selectedClass === "all" || s.class === selectedClass)
      .forEach(student => {
        const studentFees = fees.filter(f => f.studentId === student.id);
        const paid = studentFees.reduce((sum, f) => sum + (f.paid || 0), 0);
        const due = studentFees.reduce((sum, f) => sum + (f.due || 0), 0);

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${student.name} ${student.surname}</td>
          <td>${student.class}</td>
          <td>$${paid}</td>
          <td>$${due}</td>
        `;
        feeBody.appendChild(row);
      });
  }

  classSelect.addEventListener("change", () => {
    renderAttendance(classSelect.value);
    renderFees(classSelect.value);
  });

  // Load default (all)
  renderAttendance("all");
  renderFees("all");
});