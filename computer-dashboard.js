document.addEventListener("DOMContentLoaded", () => {
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");

  document.getElementById("totalStudents").innerText = `👨‍🎓 Students: ${students.length}`;
  document.getElementById("totalTeachers").innerText = `👩‍🏫 Teachers: ${teachers.length}`;

  // Attendance Rate
  const today = new Date().toISOString().split("T")[0];
  const todayRecords = attendanceRecords.filter(r => r.date === today);

  let total = 0;
  let present = 0;

  todayRecords.forEach(record => {
    Object.values(record.status || {}).forEach(status => {
      if (status) total++;
      if (status === "present") present++;
    });
  });

  const rate = total ? Math.round((present / total) * 100) : 0;
  document.getElementById("attendanceRate").innerText = `📈 Attendance Rate: ${rate}%`;

  // Announcements
  const form = document.getElementById("announcementForm");
  const titleInput = document.getElementById("announcementTitle");
  const descInput = document.getElementById("announcementDesc");
  const indexInput = document.getElementById("announcementIndex");
  const list = document.getElementById("announcementList");
  let announcements = JSON.parse(localStorage.getItem("announcements") || "[]");

  function renderAnnouncements() {
    list.innerHTML = "";
    announcements.forEach((a, i) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${a.title}</strong><br />
        <p>${a.description}</p>
        <div class="actions">
          <button onclick="editAnnouncement(${i})">✏️ Edit</button>
          <button onclick="deleteAnnouncement(${i})">🗑️ Delete</button>
        </div>
      `;
      list.appendChild(li);
    });
  }

  window.editAnnouncement = (i) => {
    const a = announcements[i];
    titleInput.value = a.title;
    descInput.value = a.description;
    indexInput.value = i;
  };

  window.deleteAnnouncement = (i) => {
    announcements.splice(i, 1);
    localStorage.setItem("announcements", JSON.stringify(announcements));
    renderAnnouncements();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newAnnouncement = {
      title: titleInput.value.trim(),
      description: descInput.value.trim()
    };

    const index = indexInput.value;
    if (index) {
      announcements[+index] = newAnnouncement;
    } else {
      announcements.push(newAnnouncement);
    }

    localStorage.setItem("announcements", JSON.stringify(announcements));
    form.reset();
    renderAnnouncements();
  });

  renderAnnouncements();
});