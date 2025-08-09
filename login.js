document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  const res = await fetch("php/login.php", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
  });

  const data = await res.json();
  if (data.status === "success") {
    window.location.href = data.role === "admin" ? "dashboard.html" : "student-dashboard.html";
  } else {
    alert(data.message || "Login failed.");
  }
});