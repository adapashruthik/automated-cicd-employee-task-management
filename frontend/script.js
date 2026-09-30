const API_BASE_URL = "/api";

// ======================================================
// INITIAL LOAD
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
    loadEmployees();
    loadTasks();
});


// ======================================================
// EMPLOYEE FORM
// ======================================================

function showEmployeeForm() {
    document.getElementById("employeeForm").style.display = "block";
}

function hideEmployeeForm() {
    document.getElementById("employeeForm").style.display = "none";
}


// ======================================================
// TASK FORM
// ======================================================

function showTaskForm() {
    document.getElementById("taskForm").style.display = "block";

    // Refresh employee dropdown
    loadEmployeeDropdown();
}

function hideTaskForm() {
    document.getElementById("taskForm").style.display = "none";
}


// ======================================================
// LOAD EMPLOYEES
// ======================================================

async function loadEmployees() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/employees`
        );

        const employees = await response.json();

        displayEmployees(employees);

        document.getElementById("totalEmployees").textContent =
            employees.length;

        loadEmployeeDropdown();

    } catch (error) {

        console.error("Error loading employees:", error);

        document.getElementById("employeeList").innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>
                <h3>Unable to load employees</h3>
                <p>Make sure the backend server is running.</p>
            </div>
        `;
    }
}


// ======================================================
// DISPLAY EMPLOYEES
// ======================================================

function displayEmployees(employees) {

    const employeeList =
        document.getElementById("employeeList");


    if (employees.length === 0) {

        employeeList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    👥
                </div>

                <h3>No employees yet</h3>

                <p>
                    Add your first employee to get started.
                </p>

            </div>
        `;

        return;
    }


    employeeList.innerHTML = employees.map(employee => `

        <div class="employee-row">

            <div class="employee-info">

                <div class="employee-avatar">
                    ${getInitials(employee.name)}
                </div>

                <div>

                    <h3>
                        ${employee.name}
                    </h3>

                    <p>
                        ${employee.email}
                    </p>

                </div>

            </div>


            <div class="employee-details">

                <span>
                    ${employee.department}
                </span>

                <span>
                    ${employee.role}
                </span>

            </div>


            <div class="employee-actions">

                <button
                    class="delete-btn"
                    onclick="deleteEmployee(${employee.id})">

                    Delete

                </button>

            </div>

        </div>

    `).join("");
}


// ======================================================
// ADD EMPLOYEE
// ======================================================

async function addEmployee() {

    const name =
        document.getElementById("employeeName").value.trim();

    const email =
        document.getElementById("employeeEmail").value.trim();

    const department =
        document.getElementById("employeeDepartment").value.trim();

    const role =
        document.getElementById("employeeRole").value.trim();


    if (!name || !email || !department || !role) {

        alert("Please fill in all employee fields.");

        return;
    }


    try {

        const response = await fetch(
            `${API_BASE_URL}/employees`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name,
                    email,
                    department,
                    role
                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(data.message || "Failed to create employee");

            return;
        }


        alert("Employee created successfully!");


        // Clear form

        document.getElementById("employeeName").value = "";
        document.getElementById("employeeEmail").value = "";
        document.getElementById("employeeDepartment").value = "";
        document.getElementById("employeeRole").value = "";


        hideEmployeeForm();

        loadEmployees();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to backend.");
    }
}


// ======================================================
// DELETE EMPLOYEE
// ======================================================

async function deleteEmployee(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this employee?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `${API_BASE_URL}/employees/${id}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to delete employee"
            );

            return;
        }


        alert("Employee deleted successfully!");

        loadEmployees();

        loadTasks();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to backend.");
    }
}


// ======================================================
// EMPLOYEE DROPDOWN
// ======================================================

async function loadEmployeeDropdown() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/employees`
        );

        const employees = await response.json();


        const dropdown =
            document.getElementById("taskEmployee");


        dropdown.innerHTML = `
            <option value="">
                Select employee
            </option>
        `;


        employees.forEach(employee => {

            const option =
                document.createElement("option");


            option.value = employee.id;

            option.textContent =
                `${employee.name} — ${employee.department}`;


            dropdown.appendChild(option);

        });

    } catch (error) {

        console.error(
            "Error loading employee dropdown:",
            error
        );
    }
}


// ======================================================
// LOAD TASKS
// ======================================================

async function loadTasks() {

    try {

        const response = await fetch(
            `${API_BASE_URL}/tasks`
        );

        const tasks = await response.json();


        displayTasks(tasks);

        updateTaskStatistics(tasks);

    } catch (error) {

        console.error("Error loading tasks:", error);

        document.getElementById("taskList").innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>Unable to load tasks</h3>

                <p>
                    Make sure the backend server is running.
                </p>

            </div>
        `;
    }
}


// ======================================================
// DISPLAY TASKS
// ======================================================

function displayTasks(tasks) {

    const taskList =
        document.getElementById("taskList");


    if (tasks.length === 0) {

        taskList.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📋
                </div>

                <h3>No tasks yet</h3>

                <p>
                    Create your first task to get started.
                </p>

            </div>
        `;

        return;
    }


    taskList.innerHTML = tasks.map(task => `

        <div class="task-card">

            <div class="task-main">

                <div class="task-title-row">

                    <h3>
                        ${task.title}
                    </h3>

                    <span class="priority ${getPriorityClass(task.priority)}">
                        ${task.priority}
                    </span>

                </div>


                <p class="task-description">
                    ${task.description || "No description provided"}
                </p>


                <div class="task-meta">

                    <span>
                        👤 ${task.employee_name}
                    </span>

                    <span>
                        📅 ${formatDate(task.due_date)}
                    </span>

                </div>

            </div>


            <div class="task-status">

                <span class="status-badge ${getStatusClass(task.status)}">

                    ${task.status}

                </span>


                <button
                    class="delete-btn"
                    onclick="deleteTask(${task.id})">

                    Delete

                </button>

            </div>

        </div>

    `).join("");
}


// ======================================================
// ADD TASK
// ======================================================

async function addTask() {

    const title =
        document.getElementById("taskTitle").value.trim();

    const description =
        document.getElementById("taskDescription").value.trim();

    const employee_id =
        document.getElementById("taskEmployee").value;

    const priority =
        document.getElementById("taskPriority").value;

    const status =
        document.getElementById("taskStatus").value;

    const due_date =
        document.getElementById("taskDueDate").value;


    if (!title || !employee_id) {

        alert(
            "Task title and employee are required."
        );

        return;
    }


    try {

        const response = await fetch(
            `${API_BASE_URL}/tasks`,
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    title,

                    description,

                    employee_id: Number(employee_id),

                    priority,

                    status,

                    due_date: due_date || null

                })
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to create task"
            );

            return;
        }


        alert("Task created successfully!");


        // Clear fields

        document.getElementById("taskTitle").value = "";

        document.getElementById("taskDescription").value = "";

        document.getElementById("taskEmployee").value = "";

        document.getElementById("taskPriority").value = "Medium";

        document.getElementById("taskStatus").value = "Pending";

        document.getElementById("taskDueDate").value = "";


        hideTaskForm();

        loadTasks();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to backend.");
    }
}


// ======================================================
// DELETE TASK
// ======================================================

async function deleteTask(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this task?"
        );


    if (!confirmed) {
        return;
    }


    try {

        const response = await fetch(
            `${API_BASE_URL}/tasks/${id}`,
            {
                method: "DELETE"
            }
        );


        const data = await response.json();


        if (!response.ok) {

            alert(
                data.message ||
                "Failed to delete task"
            );

            return;
        }


        alert("Task deleted successfully!");

        loadTasks();

    } catch (error) {

        console.error(error);

        alert("Unable to connect to backend.");
    }
}


// ======================================================
// DASHBOARD STATISTICS
// ======================================================

function updateTaskStatistics(tasks) {

    document.getElementById("totalTasks").textContent =
        tasks.length;


    const pending =
        tasks.filter(
            task => task.status === "Pending"
        ).length;


    const completed =
        tasks.filter(
            task => task.status === "Completed"
        ).length;


    document.getElementById("pendingTasks").textContent =
        pending;


    document.getElementById("completedTasks").textContent =
        completed;
}


// ======================================================
// HELPER FUNCTIONS
// ======================================================

function getInitials(name) {

    return name
        .split(" ")
        .map(word => word[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();
}


function getPriorityClass(priority) {

    return priority.toLowerCase();
}


function getStatusClass(status) {

    if (status === "Completed") {
        return "completed";
    }

    if (status === "In Progress") {
        return "in-progress";
    }

    return "pending";
}


function formatDate(date) {

    if (!date) {
        return "No due date";
    }

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}