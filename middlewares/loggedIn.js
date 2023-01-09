const CustomError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const isLoggedIn = (req,res,next)=>{
    const token = req.body.token || req.query.token || req.headers["x-access-token"];

    if(!token){
        throw new CustomError("Please Login to get the Access", 400)
    }

    try {
        const decoded = jwt.decode(token, process.env.TOKEN_KEY);
        req.user = decoded;
    } catch (error) {
        throw new CustomError(error.message,401)
    }

    return next();

}

module.exports = isLoggedIn;