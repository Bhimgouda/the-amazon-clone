const express = require('express');
const app = express();
const cors = require('cors')
const mongoose = require("mongoose")
const User = require("./models/user");
const catchAsync = require('./utils/catchAsync');
const validateUser = require('./middlewares/validation');
const CustomError = require('./utils/appError');
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const isLoggedIn = require('./middlewares/loggedIn');

if(process.env.NODE_ENV !== "prodeuction") require("dotenv").config();

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}));

app.post('/api/register',validateUser, catchAsync(async(req,res)=>{
    const {name,email,password} = req.body;
    const alreadyRegistered = await User.findOne({email})

    if(alreadyRegistered){
        throw new CustomError("The user is already Registered with Us", 400)
    }

    // Hashing the password with bcrypt

    const encryptedPassword = await bcrypt.hash(password,12)

    const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword
    })

    // Create token
    const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

    // save user token
    user.token = token;
    user.password = null;

    // returning new user
    return res.status(200).send(user)
}))

app.post('/api/login',validateUser, catchAsync(async(req,res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        throw new CustomError("We cannot find an account with that email address", 400)
    }

    const validPassword = await bcrypt.compare(password,user.password);

    if(!validPassword){
        throw new CustomError("Invalid credentials", 400)
    }

    // create token

    const token = jwt.sign(
        {user_id: user._id, email},
        process.env.TOKEN_KEY,
        {
            expiresIn :"2h",
        }
    )

    user.token = token;
    user.password = null;

    return res.send(user)
}))

app.get("/api/tokenUser",catchAsync( async(req,res)=>{
    const token = req.headers["x-access-token"];

    if(!token) return res.send(null);

    const decoded = jwt.decode(token,process.env.TOKEN_KEY)
    if(decoded){
        console.log(decoded.user_id)
        const user = await User.findById(decoded.user_id);
        user.password = null;
        return res.send(user);
    }
        
}))

app.get("/welcome", isLoggedIn, (req,res)=>{
    res.send("Hey You are welcome")
})

// Error Handling Middleware

app.use((err,req,res,next)=>{
    console.log(err.stack);
    const {message="Something went wrong", status=500} = err;
    return res.status(status).send(message);
})



app.listen(5000,()=>[
    console.log('Server listening on port 5000')
])

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/the-amazon-clone",{
})
.then(console.log("Successfully connected to the DB"))
.catch((e)=>{
console.log('database connection failed. exiting now...')
console.log(e)
})



