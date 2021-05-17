const config = require("config");
const { Sequelize } = require("sequelize");

// connection parameters
const database = new Sequelize(
    config.get("database.databaseName"),
    config.get("database.username"),
    config.get("database.password"), {
        host: config.get("database.host"),
        dialect: config.get("database.dialect"),
    }
);

// establish connection
const dbConnection = async() => {
    try {
        await database.authenticate();
        console.log("Database connection has been established successfully.");
        return true;
    } catch (error) {
        console.log(`Error: ${error}`);
    }
};

module.exports = { database, dbConnection };