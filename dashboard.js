document.addEventListener("DOMContentLoaded", () => {
  // Fetch data
  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const teachers = JSON.parse(localStorage.getItem("teachers") || "[]");
  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");
  const announcements = JSON.parse(localStorage.getItem("announcements") || "[]");

  // === Dashboard Counters ===
  document.getElementById("totalStudents").innerText = `👨‍🎓 Students: ${students.length}`;
  document.getElementById("totalTeachers").innerText = `👩‍🏫 Teachers: ${teachers.length}`;

  // === Calculate Today's Attendance Rate ===
  const today = new Date().toISOString().split("T")[0];
  const todayRecords = attendanceRecords.filter(r => r.date === today);

  let totalMarked = 0;
  let presentCount = 0;

  todayRecords.forEach(record => {
    if (record.status) {
      totalMarked++;
      if (record.status === "present") {
        presentCount++;
      }
    }
  });

  const attendanceRate = totalMarked > 0
    ? Math.round((presentCount / totalMarked) * 100)
    : 0;

  document.getElementById("attendanceRate").innerText = `📈 Attendance Rate: ${attendanceRate}%`;

  // === Announcements Logic ===
  const form = document.getElementById("announcementForm");
  const titleInput = document.getElementById("announcementTitle");
  const descInput = document.getElementById("announcementDesc");
  const indexInput = document.getElementById("announcementIndex");
  const list = document.getElementById("announcementList");

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

  // Edit Announcement
  window.editAnnouncement = (index) => {
    const a = announcements[index];
    titleInput.value = a.title;
    descInput.value = a.description;
    indexInput.value = index;
  };

  // Delete Announcement
  window.deleteAnnouncement = (index) => {
    if (confirm("Delete this announcement?")) {
      announcements.splice(index, 1);
      localStorage.setItem("announcements", JSON.stringify(announcements));
      renderAnnouncements();
    }
  };

  // Handle Save
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const newAnnouncement = {
      title: titleInput.value.trim(),
      description: descInput.value.trim()
    };

    const index = indexInput.value;
    if (index !== "") {
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