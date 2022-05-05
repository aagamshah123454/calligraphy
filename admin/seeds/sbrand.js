const express = require('express');
const mongoose = require('mongoose');

const Admin = require('../backend/models/admin');
const Blog = require('../backend/models/blog')
const Faq = require('../backend/models/faq')
const User = require('../backend/models/customer');
const Category = require('../backend/models/category');
const Brand = require('../backend/models/brand');
const Product = require('../backend/models/product');
const Image = require('../backend/models/image');
const Cart = require('../backend/models/cart');
const Order = require('../backend/models/order');
const Review = require('../backend/models/review');


const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})



const brandData=[
    {
        br_name:'Calligraphyideas',
        br_logo:'calligraphyideas.png',
        br_description:'we are the creators',
        br_visibility:'Published',
        br_publishDate:"",
        br_slug:'calligraphyideas'
    },
]







const seedDB = async()=>{

    await Brand.deleteMany();
 

    



    brandData.forEach(async(data)=>{
        const brand = new Brand(data);
        await brand.save();
    })
    
   
    

 
    console.log("all data fetched")
    
}
seedDB();