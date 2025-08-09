document.addEventListener("DOMContentLoaded", () => {
  const attendanceRecords = JSON.parse(localStorage.getItem("attendanceRecords") || "[]");

  function getAttendanceGroupedByDate(records) {
    const grouped = {};
    records.forEach(({ date, status }) => {
      if (!grouped[date]) grouped[date] = { total: 0, present: 0 };
      grouped[date].total++;
      if (status === "present") grouped[date].present++;
    });
    return grouped;
  }

  function renderWeeklyChart(records) {
    const now = new Date();
    const pastWeek = [...Array(7)].map((_, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() - (6 - i));
      return d.toISOString().split("T")[0];
    });

    const map = getAttendanceGroupedByDate(records);
    const labels = pastWeek;
    const data = pastWeek.map(date => {
      const day = map[date] || { present: 0, total: 0 };
      return day.total ? Math.round((day.present / day.total) * 100) : 0;
    });

    new Chart(document.getElementById("weeklyChart"), {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Attendance Rate (%)",
          data,
          backgroundColor: "#1DB954"
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }

  function renderMonthlyChart(records) {
    const grouped = {};

    records.forEach(({ date, status }) => {
      const month = date.slice(0, 7); // YYYY-MM
      if (!grouped[month]) grouped[month] = { present: 0, total: 0 };
      grouped[month].total++;
      if (status === "present") grouped[month].present++;
    });

    const labels = Object.keys(grouped).sort();
    const data = labels.map(month =>
      Math.round((grouped[month].present / grouped[month].total) * 100)
    );

    new Chart(document.getElementById("monthlyChart"), {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "Monthly Attendance (%)",
          data,
          borderColor: "#1DB954",
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true, max: 100 }
        }
      }
    });
  }

  renderWeeklyChart(attendanceRecords);
  renderMonthlyChart(attendanceRecords);
});