document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("new-password");

  // Load theme
  const currentTheme = localStorage.getItem("theme") || "light";
  applyTheme(currentTheme);
  themeToggle.checked = currentTheme === "dark";

  // Toggle theme
  themeToggle.addEventListener("change", () => {
    const theme = themeToggle.checked ? "dark" : "light";
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  });

  // Load saved username
  const savedUsername = localStorage.getItem("username") || "";
  usernameInput.value = savedUsername;
});

// Apply theme globally
function applyTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");
}

// Save account settings
function saveAccountSettings() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("new-password").value.trim();
  if (username) localStorage.setItem("username", username);
  if (password) localStorage.setItem("password", password);
  alert("✅ Settings saved successfully!");
}

// Backup data to file
function backupData() {
  const data = {
    students: JSON.parse(localStorage.getItem("students") || "[]"),
    teachers: JSON.parse(localStorage.getItem("teachers") || "[]"),
    attendance: JSON.parse(localStorage.getItem("attendance") || "[]"),
    grades: JSON.parse(localStorage.getItem("grades") || "[]"),
    finances: JSON.parse(localStorage.getItem("finances") || "[]"),
    timetable: JSON.parse(localStorage.getItem("timetable") || "[]"),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `academis-backup-${new Date().toISOString().split("T")[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Reset system
function resetSystem() {
  if (confirm("⚠️ This will delete all data. Are you sure?")) {
    localStorage.clear();
    alert("✅ System reset. Please refresh the page.");
    location.reload();
  }
}