document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("parentName");
  const passInput = document.getElementById("parentPassword");
  const themeSelect = document.getElementById("themeSelect");

  // Load saved settings if they exist
  const parentSettings = JSON.parse(localStorage.getItem("parentSettings") || "{}");
  nameInput.value = parentSettings.name || "";
  passInput.value = parentSettings.password || "";
  themeSelect.value = localStorage.getItem("theme") || "spotify";

  // Apply stored theme on load
  applyStoredTheme();
});

// Save changes to name and password
function saveParentSettings() {
  const name = document.getElementById("parentName").value.trim();
  const password = document.getElementById("parentPassword").value.trim();

  const updated = {
    name,
    password
  };

  localStorage.setItem("parentSettings", JSON.stringify(updated));
  alert("✅ Settings saved!");
}

// Apply selected theme
function applyTheme() {
  const selectedTheme = document.getElementById("themeSelect").value;
  localStorage.setItem("theme", selectedTheme);
  applyStoredTheme();
  alert("🎨 Theme applied: " + selectedTheme);
}

// Helper: injects class for theme
function applyStoredTheme() {
  const theme = localStorage.getItem("theme");
  document.body.classList.remove("spotify", "facebook", "dark");

  if (theme) {
    document.body.classList.add(theme);
  }
}

// Backup all localStorage data to a JSON file
function backupData() {
  const blob = new Blob(
    [JSON.stringify(localStorage, null, 2)],
    { type: "application/json" }
  );
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "academis-backup.json";
  link.click();

  URL.revokeObjectURL(url);
  alert("⬇️ Backup downloaded!");
}

// Reset all app data
function resetSystem() {
  if (confirm("⚠️ This will delete all saved data. Continue?")) {
    localStorage.clear();
    location.reload();
  }
}