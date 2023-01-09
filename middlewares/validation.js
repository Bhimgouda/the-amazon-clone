const Joi = require("joi");
const { userSchema } = require("../serverSideSchema");
const CustomError = require("../utils/appError");

const validateUser = (req,res,next)=>{
    const {email,password} = req.body;
    const user = {email,password};
    const {error} = userSchema.validate(user)
    if(error){
        const message = error.details.map(e=>e.message).join(",")
        throw new CustomError(message,400)
    }
    else next()
}

module.exports = validateUser;