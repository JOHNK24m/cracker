document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("financeForm");
  const financeIndex = document.getElementById("financeIndex");
  const studentName = document.getElementById("studentName");
  const classInput = document.getElementById("class");
  const description = document.getElementById("description");
  const amount = document.getElementById("amount");
  const datePaid = document.getElementById("datePaid");
  const type = document.getElementById("type");
  const status = document.getElementById("status");

  let financeRecords = JSON.parse(localStorage.getItem("financeRecords") || "[]");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newRecord = {
      studentName: studentName.value.trim(),
      class: classInput.value.trim(),
      description: description.value.trim(),
      amount: parseFloat(amount.value),
      date: datePaid.value,
      type: type.value,
      status: status.value,
    };

    if (financeIndex.value) {
      financeRecords[+financeIndex.value] = newRecord;
    } else {
      financeRecords.push(newRecord);
    }

    localStorage.setItem("financeRecords", JSON.stringify(financeRecords));
    form.reset();
    financeIndex.value = "";
    alert("✅ Finance record saved!");
  });
});