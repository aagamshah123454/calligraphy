const express = require('express');
const mongoose = require('mongoose');

const Material = require('../backend/models/material');


const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})

const materialData=
[
    {
    materialName:'syntheticwooden',
    materialInformation:'none'
    },
    {
        materialName:'wooden',
        materialInformation:'none'
        }
]

const seedDB = async()=>{

    await Material.deleteMany();


    materialData.forEach(async(data)=>{
        const material = new Material(data);
        await material.save();
    })
    
   
    

 
    console.log("all data fetched")
    
}
seedDB();