document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("parentSignupForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("parentName").value.trim();
    const className = document.getElementById("class").value.trim();
    const classNo = document.getElementById("classNumber").value.trim();
    const password = document.getElementById("password").value;

    const parents = JSON.parse(localStorage.getItem("parents") || "[]");

    // Prevent duplicate
    if (parents.find(p => p.classNo === classNo)) {
      alert("This class number is already registered.");
      return;
    }

    parents.push({
      name,
      class: className,
      classNo,
      password
    });

    localStorage.setItem("parents", JSON.stringify(parents));
    alert("Signup successful! Please login.");
    window.location.href = "parent-login.html";
  });
});