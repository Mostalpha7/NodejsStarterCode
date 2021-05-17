const app = require("./startup/routes");
const http = require("http").createServer(app);
const config = require("config");
const { dbConnection } = require("./startup/db");

const port = process.env.port || config.get("application.port");

// Start server
(async() => {
    try {
        const dbConnect = await dbConnection();

        if (dbConnect) {
            http.listen(port, console.log(`Server started on port: ${port}`));
        }
    } catch (error) {
        console.log(`Error: ${error}`);
    }
})();