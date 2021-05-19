const Joi = require("joi");
const { JoiPasswordComplexity } = require("joi-password");

function validateUser(user) {
    const Schema = Joi.object().keys({
        email: Joi.string().email().max(50).required(),
        firstName: Joi.string().max(20).required(),
        lastName: Joi.string().max(20).required(),
        phoneNumber: Joi.string().min(10).max(10).required(),
        countryCode: Joi.string().max(4).required(),
        type: Joi.string().valid("user", "admin").required(),
        password: JoiPasswordComplexity.string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(2)
            .minOfNumeric(2)
            .required()
            .messages({
                "password.minOfSpecialCharacters": "password should contain a special character",
                "password.minOfLowercase": "password should contain a minimun of two lowercase",
                "password.minOfNumeric": "password should contain a minimun of two numbers",
            }),
    });

    return Schema.validate(user);
}

function validateLogin(user) {
    const Schema = Joi.object().keys({
        email: Joi.string().email().max(50).required(),
        password: JoiPasswordComplexity.string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(2)
            .minOfNumeric(2)
            .required()
            .messages({
                "password.minOfSpecialCharacters": "password should contain a special character",
                "password.minOfLowercase": "password should contain a minimun of two lowercase",
                "password.minOfNumeric": "password should contain a minimun of two numbers",
            }),
    });

    return Schema.validate(user);
}

function validateEditProfile() {}

function validatePasswordUpdated() {}

function validateVerify() {}

function validateBankDetails() {}

module.exports = {
    validateUser,
    validateLogin,
    validateEditProfile,
    validatePasswordUpdated,
    validateVerify,
    validateBankDetails,
};