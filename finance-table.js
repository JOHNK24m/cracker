document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.getElementById("financeTableBody");
  const classFilter = document.getElementById("classFilter");
  const searchInput = document.getElementById("searchInput");
  const totals = document.getElementById("financeTotals");

  const records = JSON.parse(localStorage.getItem("financeRecords") || "[]");

  // Populate class dropdown
  const allClasses = [...new Set(records.map(r => r.class))];
  allClasses.forEach(cls => {
    const opt = document.createElement("option");
    opt.value = cls;
    opt.textContent = cls;
    classFilter.appendChild(opt);
  });

  function renderTable(filter = "all", search = "") {
    tableBody.innerHTML = "";
    let totalPaid = 0, totalPending = 0;

    records.forEach(record => {
      const matchesSearch =
        record.studentName.toLowerCase().includes(search) ||
        record.class.toLowerCase().includes(search) ||
        record.description.toLowerCase().includes(search) ||
        record.type.toLowerCase().includes(search);

      const matchesFilter = filter === "all" || record.class === filter;

      if (matchesSearch && matchesFilter) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${record.studentName}</td>
          <td>${record.class}</td>
          <td>${record.description}</td>
          <td>₦${record.amount.toFixed(2)}</td>
          <td>${record.date}</td>
          <td>${record.type}</td>
          <td>${record.status}</td>
        `;
        tableBody.appendChild(row);

        if (record.status === "Paid") totalPaid += record.amount;
        if (record.status === "Pending") totalPending += record.amount;
      }
    });

    totals.innerHTML = `
      <strong>✅ Paid:</strong> K${totalPaid.toFixed(2)} |
      <strong>🕒 Pending:</strong> K${totalPending.toFixed(2)}
    `;
  }

  // Event Listeners
  searchInput.addEventListener("input", () => {
    renderTable(classFilter.value, searchInput.value.toLowerCase());
  });

  classFilter.addEventListener("change", () => {
    renderTable(classFilter.value, searchInput.value.toLowerCase());
  });

  // Initial render
  renderTable();
});