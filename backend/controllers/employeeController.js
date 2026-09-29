const db = require("../config/db");

// Get all employees
const getEmployees = async (req, res) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM employees ORDER BY id DESC"
        );

        res.json(rows);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch employees"
        });
    }
};


// Get employee by ID
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await db.query(
            "SELECT * FROM employees WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json(rows[0]);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to fetch employee"
        });
    }
};


// Create employee
const createEmployee = async (req, res) => {
    try {
        const {
            name,
            email,
            department,
            role
        } = req.body;

        if (!name || !email || !department || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const [result] = await db.query(
            `INSERT INTO employees
            (name, email, department, role)
            VALUES (?, ?, ?, ?)`,
            [name, email, department, role]
        );

        res.status(201).json({
            message: "Employee created successfully",
            employeeId: result.insertId
        });

    } catch (error) {
        console.error(error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "Email already exists"
            });
        }

        res.status(500).json({
            message: "Failed to create employee"
        });
    }
};


// Update employee
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            name,
            email,
            department,
            role
        } = req.body;

        if (!name || !email || !department || !role) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const [result] = await db.query(
            `UPDATE employees
             SET name = ?, email = ?, department = ?, role = ?
             WHERE id = ?`,
            [name, email, department, role, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Employee updated successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to update employee"
        });
    }
};


// Delete employee
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await db.query(
            "DELETE FROM employees WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.json({
            message: "Employee deleted successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to delete employee"
        });
    }
};


module.exports = {
    getEmployees,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee
};