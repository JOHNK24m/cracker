document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("studentLoginForm");

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const classInput = document.getElementById("studentClass").value.trim();
    const numberInput = document.getElementById("studentNumber").value.trim();

    const students = JSON.parse(localStorage.getItem("students") || "[]");
    const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");
    const grades = JSON.parse(localStorage.getItem("grades") || "[]");
    const finance = JSON.parse(localStorage.getItem("finance") || "[]");
    const timetable = JSON.parse(localStorage.getItem("timetable") || "[]");

    const student = students.find(
      s => s.class === classInput && s.classNumber === numberInput
    );

    if (!student) {
      alert("⚠️ Student not found. Please check class and class number.");
      return;
    }

    // Show Sections
    showSections();

    // Personal Info
    document.getElementById("studentName").innerText = `${student.name} ${student.surname}`;
    document.getElementById("studentClassDisplay").innerText = student.class;
    document.getElementById("studentNumberDisplay").innerText = student.classNumber;

    // === Attendance History ===
    const attendanceList = document.getElementById("attendanceList");
    const studentAttendance = attendanceRecords.filter(
      record => record.class === student.class && record.status?.[student.classNumber]
    );

    attendanceList.innerHTML = studentAttendance.map(record => {
      const status = record.status[student.classNumber];
      const badge = status === "present" ? "🟢 Present"
                  : status === "absent" ? "🔴 Absent"
                  : status === "sick" ? "🤢 Sick"
                  : "❓";
      return `<li><strong>${record.date}</strong>: ${badge}</li>`;
    }).join("");

    // === Grade History ===
    const gradesList = document.getElementById("gradesList");
    const studentGrades = grades.filter(
      g => g.class === student.class && g.classNumber === student.classNumber
    );

    gradesList.innerHTML = studentGrades.map(g =>
      `<li><strong>${g.subject}</strong>: ${g.grade}</li>`
    ).join("");

    // === Finance Records ===
    const financeList = document.getElementById("financeList");
    const studentFinance = finance.filter(
      f => f.class === student.class && f.classNumber === student.classNumber
    );

    financeList.innerHTML = studentFinance.map(f =>
      `<li><strong>${f.date}</strong>: ${f.item} - ${f.amount} - ${f.status}</li>`
    ).join("");

    // === Timetable ===
    const timetableList = document.getElementById("timetableList");
    const classTimetable = timetable.find(t => t.class === student.class);

    if (classTimetable && classTimetable.schedule) {
      timetableList.innerHTML = Object.entries(classTimetable.schedule)
        .map(([day, periods]) => {
          return `<li><strong>${day}</strong>: ${periods.join(" | ")}</li>`;
        })
        .join("");
    } else {
      timetableList.innerHTML = "<li>No timetable found for this class.</li>";
    }
  });

  function showSections() {
    const sections = [
      "studentInfoSection",
      "attendanceSection",
      "gradesSection",
      "financeSection",
      "timetableSection"
    ];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = "block";
    });
  }
});