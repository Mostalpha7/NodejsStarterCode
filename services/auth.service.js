const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");

const { User } = require("../models");
const { Op } = require("sequelize");
const { appLogger } = require("../middlewares/logger");
const shortid = require("shortid");

const UserService = require("./user.service");
const userInstance = new UserService();

const WalletService = require("./wallet.service");
const walletInstance = new WalletService();

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

    /**
     * Registers a user
     * @param body
     * @returns user - Object
     */
    signUp(body) {
        return new Promise(async(resolve, reject) => {
            try {
                let existingUser = await User.findOne({
                    where: {
                        [Op.or]: [{ email: body.email }, { phoneNumber: body.phoneNumber }],
                    },
                });

                if (existingUser) {
                    return reject({
                        code: 400,
                        msg: "Email or phone number already used.",
                    });
                }

                const hashedPassword = await bcrypt.hash(
                    body.password,
                    config.get("application.jwt.salt")
                );

                body.password = hashedPassword;
                body.userId = shortid.generate();
                body.verified = true;
                body.status = "ACTIVE";

                const result = await User.create(body);

                console.log(result);
                console.log("adskadajkds ajnkajdsakj");
                delete result.password;
                if (!result) {
                    return reject({
                        code: 500,
                        msg: "Error occurred, user was not created.",
                    });
                }

                const user = await userInstance.getProfileInApp(body);
                const walletUser = {};
                walletUser.user = user.userId;
                const userWallet = await walletInstance.createWallet(walletUser);
                if (!userWallet)
                    return reject({
                        code: 500,
                        msg: "Error occurred, could not create wallet.",
                    });

                resolve(result);
            } catch (error) {
                error.source = "Sign Up Service";
                return reject(error);
            }
        });
    }
}

module.exports = AuthService;