
const test = require("node:test");
const assert = require("node:assert/strict");
const app = require("../server");

test("GET /api/health returns a healthy status", async () => {
    const server = app.listen(0);

    try {
        await new Promise((resolve) => server.once("listening", resolve));

        const address = server.address();
        const response = await fetch(`http://127.0.0.1:${address.port}/api/health`);
        const body = await response.json();

        assert.equal(response.status, 200);
        assert.equal(body.status, "UP");
        assert.equal(body.message, "Backend is healthy");
    } finally {
        await new Promise((resolve, reject) => {
            server.close((error) => error ? reject(error) : resolve());
        });
    }
});
