const express = require('express')//request for express from node modules
const mongoose =require('mongoose')//request for mongoose from node modules
const path  = require('path');
const ejsMate = require('ejs-mate')
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
var cookieParser = require('cookie-parser')
const {verifyToken} = require('../middleware/verifytoken')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var session = require('express-session')
const flash = require('connect-flash')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/customer')





const CategoryRouter = require('../routes/category')
const FAQRouter = require('../routes/faq')
const CustomerRouter = require('../routes/customer')
const ProductRouter = require('../routes/product')
const OrderRouter = require('../routes/orders')
const ExtraRouter = require('../routes/extra')
const UserRouter = require('../routes/userAuth')
const BlogRouter = require('../routes/blog')
const ReportRouter = require('../routes/reports')

//creating database connection
require('./../backend/db')

const app = express();//creating instance of express class for



app.set('view engine','ejs')
app.set('views',path.join(__dirname,'/views'))
app.use(fileUpload());
app.use(express.urlencoded({extended:true}))
app.use('/',express.static(__dirname + '/assets'));
app.use('/storage',express.static(__dirname + '/storage'));
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({ 
  extended: true
})); 
app.use( bodyParser.json() );  
const sessionOptions = { secret: 'keyboard cat', resave:false, saveUninitialized:false,cookie: { maxAge: 60000 }}
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())

app.use(CategoryRouter);
app.use(CustomerRouter); 
app.use(FAQRouter);
app.use(ProductRouter);//complete
app.use(OrderRouter);
app.use(ExtraRouter);
app.use(UserRouter);
app.use(BlogRouter);
app.use(ReportRouter);

app.use(cookieParser());


app.get('/admin',verifyToken,(req,res)=>{
    
    res.render('index')
})
app.get('/',(req,res)=>{
    
    res.render('client-home')
})

app.listen(3000,()=>{
    console.log("server is live on the port number :3000")
})
app.use((req,res)=>{
    res.render("client-404")
})