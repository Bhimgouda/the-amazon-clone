const mongoose = require("mongoose");
const User = require("../models/user");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/test",{
})
.then(console.log("DB connected"))
.catch((e)=>console.log(e))

const seedDB = async()=>{
    
}

seedDB()


