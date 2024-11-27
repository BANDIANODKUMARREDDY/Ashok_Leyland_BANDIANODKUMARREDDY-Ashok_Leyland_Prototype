// script.js
// Data for the dynamic planning table
const machineProcesses = [
    { name: "LS GEAR SOFT", capacity: 260.00, plan: 200 },
    { name: "MS GEAR SOFT", capacity: 264.00, plan: 220 },
    { name: "MAIN SHAFT SOFT", capacity: 267.00, plan: 250 },
    { name: "LAY SHAFT SOFT", capacity: 267.00, plan: 230 },
    { name: "INPUT SHAFT SOFT", capacity: 267.00, plan: 210 },
    // Add more rows based on the dataset
];

// Function to render the table
function renderPlanningTable() {
    const tableBody = document.getElementById('planning-table');
    tableBody.innerHTML = ''; // Clear any existing rows

    machineProcesses.forEach((process, index) => {
        const remaining = process.capacity - process.plan;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${process.name}</td>
            <td>${process.capacity.toFixed(2)}</td>
            <td>${process.plan}</td>
            <td>
                <input 
                    type="number" 
                    value="${process.plan}" 
                    min="0" 
                    max="${process.capacity}" 
                    onchange="updatePlan(${index}, this.value)"
                />
            </td>
            <td class="remaining">${remaining.toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Function to update the plan dynamically
function updatePlan(index, newPlan) {
    newPlan = parseFloat(newPlan) || 0; // Ensure valid number
    if (newPlan > machineProcesses[index].capacity) {
        alert("Plan exceeds capacity! Please enter a valid number.");
        return;
    }
    machineProcesses[index].plan = newPlan;

    // Recalculate and re-render the table
    renderPlanningTable();
}

// Initialize the table on page load
document.addEventListener('DOMContentLoaded', () => {
    renderPlanningTable();
});
