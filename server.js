if(process.env.NODE_ENV !== "prodeuction") require("dotenv").config();

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
const Product = require("./models/product");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);



// WEBHOOK FOR FULLFILLING THE ORDER
// It is a set of events that gets fired when a user proceeds from checkout session and has all the data of the order processed(success or fail)
app.post("/api/webhook", express.raw({type: 'application/json'}) , catchAsync(async(req,res)=>{
    const endPointSecret = process.env.STRIPE_SIGNING_SECRET;

    // Generating certificate for verifying authentication of webhook that we get from stripe
    const sign = req.headers['stripe-signature'];

    let event;

    // Here we are verifying that the event came from stripe
    event = stripe.webhooks.constructEvent(req.body, sign, endPointSecret)

    // Handle the checkout.session.completed event
    if(event.type==="checkout.session.completed"){
        const session = event.data.object;
        console.log(session.shipping_details.address)
        // Fulfill the order...
        fulfillTheOrder(session)
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send();
}))

async function fulfillTheOrder(session){
    const user = await User.findOne({email: session.metadata.email});
    user.orders.push({
        _id:session.id,
        orderAmount: session.amount_total/100,
        shippingAmount: session.total_details.amount_shipping /100,
        shippingAddress: session.shipping_details.address,
        images: JSON.parse(session.metadata.images),
    })

    user.save();
}


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
        password: encryptedPassword,
        orders:[]
    })

    // Create token
    const token = jwt.sign(
        { user_id: user._id, email, name: user.name },
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
        {user_id: user._id, email, name: user.name},
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
        
        const user = await User.findById(decoded.user_id);
        user.password = null;
        return res.send(user);
    }
        
}))

app.post("/api/create-checkout-session", catchAsync(async(req,res)=>{
    const { items, email } = req.body;

    // Transforming the items array into formal manner in which stripe understands
    const transformedItems = items.map(item=>{
        return {
            quantity: item.quantity,
            price_data: {
                currency: "inr",
                unit_amount: item.price*100,
                product_data: {
                    description: item.description,
                    name: item.title,
                    images: [item.image],
                }
            }
        }
    })

    // Creating checkout session using stripe
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_options: [
            {shipping_rate_data: {
                  type: 'fixed_amount',
                  fixed_amount: {amount: 0, currency: 'INR'},
                  display_name: 'Free shipping',
                  delivery_estimate: {
                    minimum: {unit: 'business_day', value: 2},
                    maximum: {unit: 'business_day', value: 3},
                  },
                },
              },
        ],
        shipping_address_collection: {
            allowed_countries: ["IN"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
            email,
            images: JSON.stringify(items.map((item) => item.image)),
        }
    })

    res.send({ id: session.id });
}))



// Product Routes

app.get("/api/products", catchAsync(async(req,res)=>{
    const products = await Product.find();
    return res.send(products);
}))


// Order Routes

app.get("/api/:id/orders", catchAsync(async(req,res)=>{
    const {id} = req.params;
    const user = await User.findById(id)

    return res.send(user.orders);
}))



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



