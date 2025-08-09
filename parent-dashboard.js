document.addEventListener("DOMContentLoaded", () => {
  const parent = JSON.parse(localStorage.getItem("loggedInParent"));

  if (!parent) {
    alert("Not logged in. Please log in again.");
    window.location.href = "parent-login.html";
    return;
  }

  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const student = students.find(
    s => s.class === parent.class && s.classNumber === parent.classNumber
  );

  if (!student) {
    alert("Student not found. Please contact the school.");
    window.location.href = "parent-login.html";
    return;
  }

  // ✅ Display student info
  document.getElementById("parentName").innerText = `👋 Welcome, Parent`;
  document.getElementById("studentName").innerText = `${student.name} ${student.surname}`;
  document.getElementById("studentClass").innerText = student.class;
  document.getElementById("studentNumber").innerText = student.classNumber;

  // ✅ Attendance
  const attendance = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");
  const studentAttendance = attendance.filter(
    r => r.class === student.class && r.classNumber === student.classNumber
  );

  const totalDays = studentAttendance.length;
  const present = studentAttendance.filter(r => r.status === "present").length;
  const absent = studentAttendance.filter(r => r.status === "absent").length;
  const sick = studentAttendance.filter(r => r.status === "sick").length;

  document.getElementById("studentAttendance").innerText = `
    Present: ${present}, Absent: ${absent}, Sick: ${sick}, Total: ${totalDays}
  `;

  // ✅ Grades
  const grades = JSON.parse(localStorage.getItem("grades") || "[]");
  const studentGrades = grades.filter(
    g => g.class === student.class && g.classNumber === student.classNumber
  );
  const gradesDiv = document.getElementById("studentGrades");
  studentGrades.forEach(g => {
    const div = document.createElement("div");
    div.textContent = `${g.subject}: ${g.grade}`;
    gradesDiv.appendChild(div);
  });

  // ✅ Finance
  const finance = JSON.parse(localStorage.getItem("financeRecords") || "[]");
  const studentFees = finance.filter(
    f => f.class === student.class && f.classNumber === student.classNumber
  );
  const financeDiv = document.getElementById("studentFinance");
  studentFees.forEach(f => {
    const div = document.createElement("div");
    div.textContent = `${f.item}: ${f.amount} (${f.status})`;
    financeDiv.appendChild(div);
  });

  // ✅ Timetable
  const timetables = JSON.parse(localStorage.getItem("timetables") || "{}");
  const timetable = timetables[student.class];
  const timetableDiv = document.getElementById("studentTimetable");

  if (Array.isArray(timetable)) {
    timetable.forEach((p, i) => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>Period ${i + 1}:</strong> ${p.subject} (${p.teacher})`;
      timetableDiv.appendChild(div);
    });
  } else {
    timetableDiv.innerText = "No timetable available.";
  }
});