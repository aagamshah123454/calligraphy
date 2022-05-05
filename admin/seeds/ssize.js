const express = require('express');
const mongoose = require('mongoose');

const Size = require('../backend/models/size');


const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})

const sizeData=
[
    {
        size:"6x6",
    },
    {
        size:"8x8",
    },
    {
        size:"5x5",
    },
    {
        size:"12x12",
    }

]

const seedDB = async()=>{

    await Size.deleteMany();


    sizeData.forEach(async(data)=>{
        const size = new Size(data);
        await size.save();
    })
    
   
    

 
    console.log("all data fetched")
    
}
seedDB();