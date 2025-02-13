const { body } = require("express-validator");

const registerValidator = [
    body("username")
        .notEmpty()
        .withMessage("Username is required"),

    body("email")
        .notEmpty()
        .withMessage("Email is required")
        .isEmail()
        .withMessage("Invalid email address")
        .normalizeEmail(),

    body("address")
        .notEmpty()
        .withMessage("Address is required"),

    body("password")
        .notEmpty()
        .withMessage("Password is required")
        .isLength({ min: 6, max: 12 })
        .withMessage("Password must be between 6-12 characters."),
];

module.exports = { registerValidator };
 