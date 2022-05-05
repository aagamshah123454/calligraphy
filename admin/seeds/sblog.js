const express = require('express');
const mongoose = require('mongoose');

const Blog = require('../backend/models/blog')



const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})




const seedDB = async()=>{
    await Blog.deleteMany();
 
    console.log("all data fetched")
    
}
seedDB();