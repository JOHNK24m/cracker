document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("parentLoginForm");
  const errorDiv = document.getElementById("loginError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const className = document.getElementById("class").value.trim();
    const classNumber = document.getElementById("classNumber").value.trim();
    const password = document.getElementById("parentPassword").value;

    const parents = JSON.parse(localStorage.getItem("parents") || "[]");

    const parent = parents.find(p =>
      p.class === className &&
      p.classNumber === classNumber &&
      p.password === password
    );

    if (parent) {
      localStorage.setItem("loggedInParent", JSON.stringify(parent));
      window.location.href = "parent-dashboard.html";
    } else {
      errorDiv.textContent = "Invalid class or password!";
    }
  });
});