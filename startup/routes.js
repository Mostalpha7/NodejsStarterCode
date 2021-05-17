const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const error = require("../middlewares/error");
const { loggerMiddleware } = require("../middlewares/logger");

const corsOptions = { origin: "*", exposedHeaders: ["x-auth-token"] };

// route files
const admin = require("../routes/admin.route");
const auth = require("../routes/auth.route");
const bitcoin = require("../routes/bitcoin.route");
const giftcard = require("../routes/giftcard.route");
const user = require("../routes/user.route");

//Middlewares
app.use(cors(corsOptions));
app.use(loggerMiddleware);
app.use(fileUpload());
app.use(express.json({ limit: "100mb", extended: true }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(express.static("public"));

// Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", user);
app.use("/api/v1/giftcard", giftcard);
app.use("/api/v1/admin", admin);
app.use("/api/v1/bitcoin", bitcoin);

app.use(error);

// Default landing endpoint
app.use("/", (req, res, next) => {
    res.status(200).send({ message: "Welcome to This-APP." });
});
module.exports = app;