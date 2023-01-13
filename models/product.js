const mongoose = require("mongoose")
const {Schema} = mongoose;

const productSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    category: String,
    image: String,
    quantity: Number,
    rating:{
        rate: Number,
        count: Number,
    },
})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;