const AuthService = require("../services/auth.service");
const { JsonResponse } = require("../utils/apiResponse");
const {
    validateLogin,
    validateUser,
} = require("../validations/user.validation");

const authInstance = new AuthService();

exports.login = async(req, res, next) => {
    try {
        const { error } = validateLogin(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);
        const { user, token } = await authInstance.signIn(req.body);
        res.header("x-auth-token", token);
        JsonResponse(res, 200, "Login Success", user);
    } catch (error) {
        next(error);
    }
};

exports.register = async(req, res, next) => {
    try {
        // check if all required inputs are present.
        const { error } = validateUser(req.body);
        if (error) return JsonResponse(res, 400, error.details[0].message);

        if (req.body.type !== "user") {
            return JsonResponse(req, 400, "Type must be User");
        }

        const registeredUser = await authInstance.signUp(req.body);
        JsonResponse(res, 200, "Registration Success", registeredUser);
    } catch (error) {
        next(error);
    }
};