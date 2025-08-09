document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("attendanceRecordsContainer");
  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");
  const students = JSON.parse(localStorage.getItem("students") || "[]");

  // Group by class and date
  const grouped = {};

  attendanceRecords.forEach(entry => {
    const key = `${entry.class}_${entry.date}`;
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(entry);
  });

  Object.keys(grouped).forEach(key => {
    const [className, date] = key.split("_");
    const entries = grouped[key];

    const section = document.createElement("div");
    section.classList.add("form-section");
    section.innerHTML = `
      <h2>📘 Class: ${className} | 📅 ${date}</h2>
      <table>
        <thead>
          <tr>
            <th>Class No.</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${entries
            .map(entry => {
              const student = students.find(
                s => s.class === entry.class && String(s.classNumber) === String(entry.classNumber)
              );
              const name = student ? `${student.name} ${student.surname}` : "❓ Unknown Student";
              let badge = "⚪ Unknown";
              if (entry.status === "present") badge = "🟢 Present";
              if (entry.status === "absent") badge = "🔴 Absent";
              if (entry.status === "sick") badge = "🤢 Sick";
              return `
                <tr>
                  <td>${entry.classNumber}</td>
                  <td>${name}</td>
                  <td>${badge}</td>
                </tr>
              `;
            })
            .join("")}
        </tbody>
      </table>
    `;
    container.appendChild(section);        ow() });
 
  });
