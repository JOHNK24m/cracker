document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentForm");
  const classSelect = document.getElementById("classSelect");
  const storageKey = "students";
  let students = JSON.parse(localStorage.getItem(storageKey)) || [];

  // Load class options from Class Management
  if (classSelect) {
    const classes = JSON.parse(localStorage.getItem("classes") || "[]");
    classes.forEach(cls => {
      const option = document.createElement("option");
      option.value = cls.name;
      option.textContent = cls.name;
      classSelect.appendChild(option);
    });
  }

  if (studentForm) {
    studentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const student = {
        name: document.getElementById("name").value,
        surname: document.getElementById("surname").value,
        age: parseInt(document.getElementById("age").value),
        class: document.getElementById("classSelect").value,
        classNumber: document.getElementById("classNumber").value,
        grade: document.getElementById("grade").value,
        email: document.getElementById("email").value,
        parentContact: document.getElementById("parentContact").value,
        address: document.getElementById("address").value
      };

      const index = document.getElementById("studentIndex").value;

      if (index === "") {
        students.push(student);
      } else {
        students[index] = student;
        document.getElementById("studentIndex").value = "";
      }

      localStorage.setItem(storageKey, JSON.stringify(students));
      studentForm.reset();
      alert("✅ Student saved successfully.");
    });
  }
});