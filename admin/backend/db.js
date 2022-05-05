const mongoose = require('mongoose')//request for mongoose from node modules



mongoose.connect('mongodb://localhost:27017/calligraphyideas',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
//database connection code ends
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Connectio  error : "))
db.once('open', () => console.log("Database connected"))