const Joi = require("joi");
const { JoiPasswordComplexity } = require("joi-password");

function validateUser() {}

function validateLogin(user) {
    const Schema = Joi.object().keys({
        email: Joi.string().email().max(50).required(),
        password: JoiPasswordComplexity.string()
            .minOfSpecialCharacters(1)
            .minOfLowercase(2)
            .minOfNumeric(2)
            .required(),
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