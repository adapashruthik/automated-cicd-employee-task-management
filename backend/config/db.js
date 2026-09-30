const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT) || 3306,

    // Force IPv4 connection to Aiven
    family: 4,

    ssl: process.env.DB_SSL === "true"
        ? { rejectUnauthorized: false }
        : undefined,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,

    // Give the connection enough time
    connectTimeout: 20000
});

module.exports = pool;