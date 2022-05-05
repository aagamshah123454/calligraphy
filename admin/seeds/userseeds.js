const express = require('express');
const mongoose = require('mongoose');
const User = require('../backend/models/customer');
const Order = require('../backend/models/order')
const Cart = require('../backend/models/cart');
const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})



// const UserData = [
//     {
//         username:"Aagam",
//         profileImagePath:"Aagam_profile.png",
//         email:"aagamshah25121@gmail.com",
//         password:"Drunken_master@Aagam",
//         streetAddress:"E/8 chandragupta apt behind sahajandand",
//         country:"India",
//         state:"Gujarat",
//         district:"Ahmedabad",
//         city:"Ahmedabad",
//         pincode:380015,
//         phone:1234567890,
//     },
//     {
//         username:"Rohit",
//         profileImagePath:"Rohit_profile.png",
//         email:"RohitRoby25121@gmail.com",
//         password:"Drunken_master@Rohit",
//         streetAddress:"E/9 chandragupta apt behind sahajandand",
//         country:"India",
//         state:"Gujarat",
//         district:"Ahmedabad",
//         city:"Ahmedabad",
//         pincode:380016,
//         phone:1234567891,
//     },
//     {
//         username:"Sahil",
//         profileImagePath:"Sahil_profile.png",
//         email:"SahilAhuja25121@gmail.com",
//         password:"Drunken_master@Sahil",
//         streetAddress:"E/10 chandragupta apt behind sahajandand",
//         country:"India",
//         state:"Gujarat",
//         district:"Ahmedabad",
//         city:"Ahmedabad",
//         pincode:380017,
//         phone:1234567892,
//     }
// ]
const OrderData = [
    {
        o_userId:"6227bb298cf07b2f94bb0753",
       o_cart_Id:"622995cf9f151fc957352ae2",
        status:"pending",
        paymentStatus:"Paid"
    },

]
// const CartData = [
//     {
//         ca_userId:"6227bb298cf07b2f94bb0753",
//         ca_product:[{
    
//             ca_product_id:"62248cf897a8ff5872840892",
//             ca_product_color_id:"62231b3e90815050a612ecb8",
//             ca_product_size_id:"6223e756cc2295c94bf5145f",
//             ca_product_quantity_id:2,
//             ca_product_material_id:"6223e6a245f25c29f6583d51",
//             ca_product_type_id:"handwritten"
//         }],
//         ca_finalAmount:6000,
//         timestamp:true,
//     }
    

 
// ]

const seedDB = async()=>{

    //  await User.deleteMany();
    await Order.deleteMany();
    // await Cart.deleteMany();
    

    // UserData.forEach(async(data)=>{
    //     const user = new User(data);
    //     await user.save();
    // })

    OrderData.forEach(async(data)=>{
        const order = new Order(data);
        await order.save()
    })
    console.log("all data fetched")

    // CartData.forEach(async(data)=>{
    //     let cart = new Cart(data);
    //     await cart.save();
    // })
}
seedDB();