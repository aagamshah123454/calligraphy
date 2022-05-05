const express = require('express');
const mongoose = require('mongoose');

const Admin = require('../backend/models/admin');



const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})





const adminData = [
    {
        a_name:'Aagam',
        a_email:'Aagamshah25121@gmail.com',
        a_contact:8238111713,
        a_password:'Drunken_master@aagam',
        a_streetAddress:'E/8 chandragupta apt behind sahajandand college',
        a_city:'Ahmedabad',
        a_country:'India',
    }   
]






const seedDB = async()=>{
    await Admin.deleteMany(); 
   




    adminData.forEach(async(data)=>{
        const admin = new Admin(data);
        await admin.save();
    }) 


   
    

 
    console.log("all data fetched")
    
}
seedDB();