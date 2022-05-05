const express = require('express');
const mongoose = require('mongoose');
const Faq = require('../backend/models/faq')



const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})


const FaqData=[
	{
		"question": "question 1",
		"answer": "answer1",
		"hidden":1
	},
    {
		"question": "question 2",
		"answer": "answer2",
		"hidden":0
	},
    {
		"question": "question 3",
		"answer": "answer3",    
		"hidden":1
	},
    	{
		"question": "question 4",
		"answer": "answer4",
		"hidden":0
	},
    	{
		"question": "question 5",
		"answer": "answer5",
		"hidden":0
	},

    
]






const seedDB = async()=>{
 
    await Faq.deleteMany();  


    FaqData.forEach(async(data)=>{
        const faq = new Faq(data);
        await faq.save();
    }) 



    
    

 
    console.log("all data fetched")
    
}
seedDB();