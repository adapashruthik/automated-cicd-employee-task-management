const net = require("net");

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