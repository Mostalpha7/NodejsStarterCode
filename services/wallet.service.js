const { Wallet } = require("../models/index");

class WalletService {
    /**
     * Create user wallet
     * @param user - Object
     * @returns Wallet - Object
     */
    createWallet(user) {
        return new Promise(async(resolve, reject) => {
            try {
                user.balance = 0;
                user.giftcardBalance = 0;
                user.giftcardTraded = 0;
                user.bitcoinBalance = 0;
                user.currency = "NGN";
                const createdWallet = await Wallet.create(user);
                resolve(createdWallet);
            } catch (error) {
                error.source = "Create wallet service";
                return reject(error);
            }
        });
    }

    /**
     * Get user wallet
     * @param userId - String
     * @returns Wallet - Object
     */
    getWallet(userId) {
        return new Promise(async(resolve, reject) => {
            try {
                const userWallet = await Wallet.findOne({
                    where: {
                        user: userId,
                    },
                    raw: true,
                });

                resolve(userWallet);
            } catch (error) {
                error.source = "Get wallet service";
                return reject(error);
            }
        });
    }

    /**
     * Edit a user wallet
     * @param body - Object
     * @param user - Object
     * @returns updatedUser - Object
     */
    updateWallet(userId, updateObject) {
        return new Promise(async(resolve, reject) => {
            try {
                const updatedWallet = await Wallet.update(updateObject, {
                    where: {
                        user: userId,
                    },
                });
                resolve(updatedWallet);
            } catch (error) {
                error.source = "Update wallet service";
                return reject(error);
            }
        });
    }
}

module.exports = WalletService;