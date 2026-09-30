require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const net = require("net");

const db = require("./config/db");
const employeeRoutes = require("./routes/employeeRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


// 🔹 TEMPORARY NETWORK TEST
app.get("/api/network-test", (req, res) => {
    const socket = new net.Socket();

    socket.setTimeout(10000);

    socket.on("connect", () => {
        socket.destroy();

        res.json({
            status: "success",
            message: "Render can reach Aiven MySQL",
            host: process.env.DB_HOST,
            port: process.env.DB_PORT
        });
    });

    socket.on("timeout", () => {
        socket.destroy();

        res.status(500).json({
            status: "error",
            message: "Connection timed out"
        });
    });

    socket.on("error", (error) => {
        socket.destroy();

        res.status(500).json({
            status: "error",
            message: "Network connection failed",
            code: error.code
        });
    });

    socket.connect(
        Number(process.env.DB_PORT),
        process.env.DB_HOST
    );
});


// Frontend
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});


// Health check
app.get("/api/health", (req, res) => {
    res.json({
        status: "UP",
        message: "Backend is healthy"
    });
});


// Database test
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


// API routes
app.use("/api/employees", employeeRoutes);
app.use("/api/tasks", taskRoutes);


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});