module.exports = (sequelize, DataTypes) => {
    const wallet = sequelize.define(
        "Wallet", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            user: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: "User",
                    key: "userId",
                },
            },
            currency: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            balance: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            bitcoinBalance: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            giftcardBalance: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            giftcardTraded: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            freezeTableName: true,
        }
    );
    // Wallet.sync()
    return wallet;
};