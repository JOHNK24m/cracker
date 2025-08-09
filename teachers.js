document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("teacherForm");
  const classSelect = document.getElementById("classAssigned");
  const indexField = document.getElementById("teacherIndex");
  let teachers = JSON.parse(localStorage.getItem("teachers") || "[]");

  // Load class options
  const classes = JSON.parse(localStorage.getItem("classes") || "[]");
  classes.forEach(cls => {
    const option = document.createElement("option");
    option.value = cls.name;
    option.textContent = cls.name;
    classSelect.appendChild(option);
  });

  // Handle edit
  const editData = sessionStorage.getItem("editTeacherData");
  if (editData) {
    const teacher = JSON.parse(editData);
    document.getElementById("name").value = teacher.name;
    document.getElementById("surname").value = teacher.surname;
    document.getElementById("email").value = teacher.email;
    document.getElementById("department").value = teacher.department;
    document.getElementById("experience").value = teacher.experience;
    document.getElementById("subjects").value = teacher.subjects;
    classSelect.value = teacher.classAssigned;
    indexField.value = sessionStorage.getItem("editTeacherIndex");
    sessionStorage.clear();
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newTeacher = {
      name: document.getElementById("name").value,
      surname: document.getElementById("surname").value,
      email: document.getElementById("email").value,
      department: document.getElementById("department").value,
      experience: parseInt(document.getElementById("experience").value),
      subjects: document.getElementById("subjects").value,
      classAssigned: classSelect.value
    };

    const index = indexField.value;
    if (index === "") {
      teachers.push(newTeacher);
    } else {
      teachers[index] = newTeacher;
      indexField.value = "";
    }

    localStorage.setItem("teachers", JSON.stringify(teachers));
    alert("✅ Teacher saved.");
    form.reset();
  });
});