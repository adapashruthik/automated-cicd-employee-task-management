require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");


const db = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "UP",
        message: "Backend is healthy"
    });
});

app.get("/api/db-test", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT 1 AS result");

        res.json({
            status: "success",
            database: "MySQL connected",
            result: rows[0].result
        });

    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            status: "error",
            message: "Database connection failed"
        });
    }
});
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});