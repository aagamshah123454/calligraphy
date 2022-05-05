const express = require('express');
const mongoose = require('mongoose');

const Color = require('../backend/models/color');


const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})

const colorData=[
    {
        color_name:'red',
        color_code:'FF0000',
        hidden:0,
    },
    {
        color_name:'Green',
        color_code:'00FF00',
        hidden:0,
    },
    {
        color_name:'Blue',
        color_code:'0000FF'
    },
    {
        color_name:'White',
        color_code:'FFFFF'
    },
    {
        color_name:'Black',
        color_code:'000000'
    }
]


const seedDB = async()=>{

    await Color.deleteMany();


    colorData.forEach(async(data)=>{
        const color = new Color(data);
        await color.save();
    })
    
   
    

 
    console.log("all data fetched")
    
}
seedDB();