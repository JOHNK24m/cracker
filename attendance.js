document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("individualAttendanceForm");
  const dateToday = new Date().toISOString().split("T")[0];
  document.getElementById("current-date").textContent = new Date().toDateString();

  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const className = document.getElementById("classInput").value.trim();
    const classNumber = document.getElementById("classNumberInput").value.trim();
    const status = document.getElementById("attendanceStatus").value;

    if (!className || !classNumber || !status) {
      alert("⚠️ All fields are required.");
      return;
    }

    const entry = {
      date: dateToday,
      class: className,
      classNumber: classNumber,
      status: status
    };

    attendanceRecords.push(entry);
    localStorage.setItem("attendanceRecords", JSON.stringify(attendanceRecords));

    alert("✅ Attendance submitted.");
    form.reset();
  });
});