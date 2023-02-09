const mongoose = require("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type:String,
        unique:true
    },
    password: String,
    token: String,
    orders: [
        {
        _id: String,
        orderAmount: Number,
        shippingAmount: Number,
        shippingAddress: {},
        images: Array,
        timeStamp: String,
        }
    ],
})

const User = mongoose.model('User', userSchema);

module.exports = User;