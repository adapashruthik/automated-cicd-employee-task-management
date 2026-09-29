const db = require("../config/db");

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                tasks.id,
                tasks.title,
                tasks.description,
                tasks.employee_id,
                employees.name AS employee_name,
                tasks.priority,
                tasks.status,
                tasks.due_date,
                tasks.created_at
            FROM tasks
            JOIN employees
                ON tasks.employee_id = employees.id
            ORDER BY tasks.id DESC
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch tasks"
        });
    }
};


// Get one task
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(`
            SELECT
                tasks.id,
                tasks.title,
                tasks.description,
                tasks.employee_id,
                employees.name AS employee_name,
                tasks.priority,
                tasks.status,
                tasks.due_date,
                tasks.created_at
            FROM tasks
            JOIN employees
                ON tasks.employee_id = employees.id
            WHERE tasks.id = ?
        `, [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Failed to fetch task"
        });
    }
};


// Create task
const createTask = async (req, res) => {
    try {
        const {
            title,
            description,
            employee_id,
            priority,
            status,
            due_date
        } = req.body;

        if (!title || !employee_id) {
            return res.status(400).json({
                message: "Title and employee are required"
            });
        }

        // Check employee exists
        const [employee] = await db.query(
            "SELECT id FROM employees WHERE id = ?",
            [employee_id]
        );

        if (employee.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        const [result] = await db.query(
            `INSERT INTO tasks
            (title, description, employee_id, priority, status, due_date)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                title,
                description || null,
                employee_id,
                priority || "Medium",
                status || "Pending",
                due_date || null
            ]
        );

        res.status(201).json({
            message: "Task created successfully",
            taskId: result.insertId
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to create task"
        });
    }
};


// Update task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            employee_id,
            priority,
            status,
            due_date
        } = req.body;

        if (!title || !employee_id) {
            return res.status(400).json({
                message: "Title and employee are required"
            });
        }

        const [result] = await db.query(
            `UPDATE tasks
             SET title = ?,
                 description = ?,
                 employee_id = ?,
                 priority = ?,
                 status = ?,
                 due_date = ?
             WHERE id = ?`,
            [
                title,
                description || null,
                employee_id,
                priority || "Medium",
                status || "Pending",
                due_date || null,
                id
            ]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update task"
        });
    }
};


// Delete task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM tasks WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete task"
        });
    }
};


module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};