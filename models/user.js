module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "User", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            userId: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            type: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            countryCode: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber2: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            gender: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            profilePicture: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            validID: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nokFirstName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nokLastName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nokEmail: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nokCountryCode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nokPhoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            nokCountry: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            verified: {
                type: DataTypes.BOOLEAN,
                allowNull: true,
            },
            verifiedBy: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            status: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            // Bank Information
            bankName: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            bankCode: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            accountNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            accountName: {
                type: DataTypes.STRING,
                allowNull: true,
            },

            // Kyc Details
            nin: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dob: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            bvn: {
                type: DataTypes.STRING,
                allowNull: true,
            },
        }, {
            freezeTableName: true,
        }
    );
    User.sync();
    return User;
};