const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const { User } = require("../models");
const { Op } = require("sequelize");
const { appLogger } = require("../middlewares/logger");
const shortid = require("shortid");

class AuthService {
    /**
     * Authenticates a user
     * @param body
     * @returns authUser - Object
     */
    signIn(body) {
        return new Promise(async(resolve, reject) => {
            try {
                let user = await User.findOne({
                    where: {
                        email: body.email,
                    },
                    raw: true,
                });

                // validate user
                if (!user) {
                    return reject({ code: 404, msg: "User not found" });
                }
                if (!user.verified) {
                    return reject({ code: 404, msg: "User not verified" });
                }
                const isEqual = await bcrypt.compare(body.password, user.password);
                if (!isEqual) {
                    return reject({ code: 400, message: "Password incorrect" });
                }

                // Sign user
                delete user.password;
                const token = jwt.sign(user, config.get("application.jwt.key"), {
                    expiresIn: "3d",
                });
                if (!token) {
                    return reject({ code: 400, msg: "Could not sign user" });
                }
                resolve({ user, token });
            } catch (error) {
                error.source = "Sign In Service";
                return reject(error);
            }
        });
    }
}

module.exports = AuthService;