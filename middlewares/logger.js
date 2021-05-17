const chalk = require("chalk");

exports.loggerMiddleware = async(req, res, next) => {
    const currentDate = new Date();
    console.log(chalk.blue(`${req.method} ${req.path} - ${currentDate}`));
    next();
};
exports.logError = async(name, error) => {
    console.log(chalk.greenBright(name));
    console.log(error);
};

exports.appLogger = async(name, error) => {
    console.log(chalk.yellow(name));
    console.log(data);
};