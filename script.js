
// Employee Directory 2.0

let employees = [
    {
        id: 1,
        name: "John Doe",
        department: "IT",
        role: "Engineer",
        email: "john@company.com",
        phone: "9876543210"
    },
    {
        id: 2,
        name: "Jane Smith",
        department: "HR",
        role: "Manager",
        email: "jane@company.com",
        phone: "9123456780"
    }
];

const employeeList = document.getElementById("employeeList");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const addEmployeeForm = document.getElementById("addEmployeeForm");

// Display employees
function renderEmployees() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const deptFilter = departmentFilter.value;

    employeeList.innerHTML = "";

    const filtered = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm) &&
        (deptFilter === "" || emp.department === deptFilter)
    );

    if (filtered.length === 0) {
        employeeList.innerHTML = "<p>No employees found.</p>";
        return;
    }

    filtered.forEach(emp => {
        const card = document.createElement("div");
        card.className = "col-md-4 mb-3";

        const employeeCard = document.createElement("div");
        employeeCard.className = "employee-card";

        const name = document.createElement("h5");
        name.textContent = emp.name;

        const department = document.createElement("p");
        department.textContent = "Department: " + emp.department;

        const role = document.createElement("p");
        role.textContent = "Role: " + emp.role;

        const email = document.createElement("p");
        email.textContent = "Email: " + emp.email;

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + emp.phone;

        // Edit button
        const editButton = document.createElement("button");
        editButton.className = "btn btn-primary btn-sm me-2";
        editButton.textContent = "Edit";
        editButton.type = "button";

        editButton.addEventListener("click", () => {
            editEmployee(emp.id);
        });

        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Delete";
        deleteButton.type = "button";

        deleteButton.addEventListener("click", () => {
            deleteEmployee(emp.id);
        });

        employeeCard.append(
            name,
            department,
            role,
            email,
            phone,
            editButton,
            deleteButton
        );

        card.appendChild(employeeCard);
        employeeList.appendChild(card);
    });
}

// Add a new employee
addEmployeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newEmployee = {
        id: Date.now(),
        name: document.getElementById("empName").value.trim(),
        department: document.getElementById("empDept").value.trim(),
        role: document.getElementById("empRole").value.trim(),
        email: document.getElementById("empEmail").value.trim(),
        phone: document.getElementById("empPhone").value.trim()
    };

    if (
        !newEmployee.name ||
        !newEmployee.department ||
        !newEmployee.role ||
        !newEmployee.email ||
        !newEmployee.phone
    ) {
        alert("Please fill in all employee details.");
        return;
    }

    employees.push(newEmployee);
    addEmployeeForm.reset();
    renderEmployees();
});

// Edit an employee
function editEmployee(id) {
    const employee = employees.find(emp => emp.id === id);

    if (!employee) return;

    const name = prompt("Enter employee name:", employee.name);
    if (name === null) return;

    const department = prompt(
        "Enter department:",
        employee.department
    );
    if (department === null) return;

    const role = prompt("Enter role:", employee.role);
    if (role === null) return;

    const email = prompt("Enter email:", employee.email);
    if (email === null) return;

    const phone = prompt("Enter phone:", employee.phone);
    if (phone === null) return;

    if (
        !name.trim() ||
        !department.trim() ||
        !role.trim() ||
        !email.trim() ||
        !phone.trim()
    ) {
        alert("All fields are required.");
        return;
    }

    employee.name = name.trim();
    employee.department = department.trim();
    employee.role = role.trim();
    employee.email = email.trim();
    employee.phone = phone.trim();

    renderEmployees();
}

// Delete an employee
function deleteEmployee(id) {
    const employee = employees.find(emp => emp.id === id);

    if (!employee) return;

    const confirmed = confirm(
        "Are you sure you want to delete " + employee.name + "?"
    );

    if (!confirmed) return;

    employees = employees.filter(emp => emp.id !== id);

    renderEmployees();
}

// Search and filter
searchInput.addEventListener("input", renderEmployees);
departmentFilter.addEventListener("change", renderEmployees);

// Initial display
renderEmployees();
