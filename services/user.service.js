const config = require("config");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { v4: uuidv4 } = require("uuid");
// const { appFileUpload } = require("../utils/fileUpload");

const WalletService = require("./wallet.service");
const walletInstance = new WalletService();

class UserService {
    /**
     * Get a user
     * @param user - Object
     * @returns User - Object
     */
    getProfile(user) {
        return new Promise(async(resolve, reject) => {
            try {
                const registeredUser = await User.findOne({
                    where: {
                        email: user.email,
                    },
                    raw: true,
                });
                if (!registeredUser)
                    return reject({ code: 404, msg: "User not found" });
                if (!registeredUser.verified)
                    return reject({ code: 404, msg: "User not verified" });
                if (registeredUser.status !== "ACTIVE")
                    return reject({ code: 404, msg: "User not Active" });
                delete registeredUser.password;

                registeredUser.wallet = await walletInstance.getWallet(
                    registeredUser.userId
                );
                resolve(registeredUser);
            } catch (error) {
                error.source = "Get Profile Service";
                return reject(error);
            }
        });
    }

    /**
     * Edit a user
     * @param body - Object
     * @param user - Object
     * @returns updatedUser - Object
     */
    editProfile(body, user) {
        return new Promise(async(resolve, reject) => {
            try {
                const updatedUser = await User.update(body, {
                    where: {
                        email: user.email,
                    },
                });
                resolve(updatedUser);
            } catch (error) {
                error.source = "Edit Profile Service";
                return reject(error);
            }
        });
    }

    /**
     * User KYC
     * @param files - Object
     * @param user - Object
     * @returns updatedUser - Object
     */
    editKyc(files, user) {
        return new Promise(async(resolve, reject) => {
            try {
                const body = {};
                if (!files || Object.keys(files).length === 0) {
                    return reject({ code: 400, msg: "No files were uploaded." });
                }

                if (files.profilePicture) {
                    const profilePicture = files.profilePicture;
                    const profilePictureName =
                        "profilePictures/" + uuidv4() + profilePicture.name;
                    await appFileUpload(profilePicture, profilePictureName);
                    body.profilePicture = profilePictureName;
                }

                if (files.validID) {
                    const validID = files.validID;
                    const validIDName = "validIDs/" + uuidv4() + validID.name;
                    await appFileUpload(validID, validIDName);

                    body.validID = validIDName;
                }
                this.editProfile(body, user);

                resolve();
            } catch (error) {
                error.source = "Edit KYC Service";
                return reject(error);
            }
        });
    }

    /**
     * Edit a user
     * @param body - Object
     * @param user - Object
     * @returns updatedUser - Object
     */
    changePassword(body, user) {
        return new Promise(async(resolve, reject) => {
            try {
                const activeUser = await User.findOne({
                    where: {
                        email: user.email,
                    },
                    raw: true,
                });
                const isEqual = await bcrypt.compare(
                    body.oldPassword,
                    activeUser.password
                );
                if (!isEqual)
                    return reject({ code: 400, msg: "Old password incorrect" });

                const hashedPassword = await bcrypt.hash(
                    body.newPassword,
                    config.get("application.jwt.salt")
                );

                const updatedUser = await User.update({ password: hashedPassword }, {
                    where: {
                        email: user.email,
                    },
                });
                resolve(updatedUser);
            } catch (error) {
                error.source = "Change password service";
                return reject(error);
            }
        });
    }

    /**
     * Get a user in-app
     * @param user - Object
     * @returns User - Object
     */
    getProfileInApp(user) {
        return new Promise(async(resolve, reject) => {
            try {
                const registeredUser = await User.findOne({
                    where: {
                        email: user.email,
                    },
                    raw: true,
                });
                if (!registeredUser)
                    return reject({
                        code: 404,
                        msg: "User not found, process in-complete",
                    });
                delete registeredUser.password;
                resolve(registeredUser);
            } catch (error) {
                error.source = "Get Profile Service In-App";
                return reject(error);
            }
        });
    }

    /**
     * Updates bank details
     * @param userBankDetails - Object
     * @returns user - Object
     */
    updateBankDetails(userBankDetails, user) {
        return new Promise(async(resolve, reject) => {
            try {
                const updatedUserDetails = await User.update(userBankDetails, {
                    where: {
                        email: user.email,
                    },
                });

                return resolve(updatedUserDetails);
            } catch (error) {
                error.source = "UpdateBankDetails service";
                return reject(error);
            }
        });
    }
}

module.exports = UserService;