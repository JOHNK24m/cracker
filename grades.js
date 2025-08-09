document.addEventListener("DOMContentLoaded", () => {
  const gradeForm = document.getElementById("gradeForm");
  const classInput = document.getElementById("classInput");
  const classNumberInput = document.getElementById("classNumberInput");
  const subjectInput = document.getElementById("subjectInput");
  const scoreInput = document.getElementById("scoreInput");

  const students = JSON.parse(localStorage.getItem("students") || "[]");
  const grades = JSON.parse(localStorage.getItem("grades") || "[]");

  gradeForm.addEventListener("submit", e => {
    e.preventDefault();

    const className = classInput.value.trim();
    const classNumber = classNumberInput.value.trim();
    const subject = subjectInput.value.trim();
    const score = parseFloat(scoreInput.value);

    if (!className || !classNumber || !subject || isNaN(score)) {
      return alert("Please fill all fields correctly.");
    }

    const student = students.find(s => s.class === className && s.classNumber === classNumber);

    if (!student) {
      return alert("Student not found with given class and class number.");
    }

    grades.push({
      studentId: student.id,
      studentName: `${student.name} ${student.surname}`,
      class: student.class,
      classNumber: student.classNumber,
      subject,
      score
    });

    localStorage.setItem("grades", JSON.stringify(grades));
    gradeForm.reset();
    alert("✅ Grade saved.");
  });
});