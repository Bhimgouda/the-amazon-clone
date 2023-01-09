// This module is for express/server-side validation before anything is inserted into DB

const Joi = require("joi");

exports.userSchema = Joi.object({
    // name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
})