const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const ExtraController = require("./../backend/controllers/extraController")
const {verifyToken,verifyTokenU} = require('../middleware/verifytoken')
const session = require('express-session')
const Product = require("./../backend/models/product")
require('./../backend/db')




const ExtraRouter = express.Router();
const oneDay = 1000 * 60 * 60 * 24;
ExtraRouter.use(session({
    secret: "calligraphyideassecretkey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: true 
}));


ExtraRouter.get('/admin/Filemanager',verifyToken,ExtraController.Filemanager_GET)
ExtraRouter.get('/admin/Invoice',verifyToken,ExtraController.Invoice_GET)

ExtraRouter.get('/admin/Calender',verifyToken,ExtraController.Calendar_GET)
ExtraRouter.get('/admin/Analytics',verifyToken,ExtraController.Analytics_GET)
ExtraRouter.get('/meet-my-team',ExtraController.MeetMyTeam_GET)
ExtraRouter.get('/category/products/comingsoon',ExtraController.ComingSoon_GET)
ExtraRouter.get('/category/comingsoon',ExtraController.ComingSoon_GET)
ExtraRouter.get('/brands/comingsoon',ExtraController.ComingSoon_GET)
ExtraRouter.get('/pages/qualityAssured',ExtraController.QualityAssured_GET)
ExtraRouter.get('/pages/termsandconditions',ExtraController.TermsAndConditions_GET)
ExtraRouter.get('/pages/paymentOptions',ExtraController.PaymentOptions_GET)
ExtraRouter.get('/pages/Blogs/:id',ExtraController.Blog_GET)
ExtraRouter.get('/pages/virtual-tour',ExtraController.vtour_GET)
ExtraRouter.post('/products/add-to-cart/:id',verifyTokenU,async (req,res)=>{
    console.log(req.body)
    let productID = req.params.id
    let product = await Product.findById({_id:productID}).populate("options")
    // console.log(productID)
    // console.log(product.title)
    console.log(req.user._id)

    let sess = req.session;

    // console.log("Session req",req.session)

    let newCartItem = {
        
        ca_userId:req.user._id,
        ca_product:[{

            ca_product_id:product._id,
         

        }],
        ca_finalAmount: ((product.SKU.basePrice) * (product.options[0].quantity))
    }

    if(!sess.cart){
        sess.cart = []
        sess.cart.push(newCartItem)
    }
    else{
        // console.log("Session req",sess)
        sess.cart.push(newCartItem)
        console.log("Session req",req.session)
    }

    res.redirect('/carts')
    // await newCartItem.save()
})
ExtraRouter.get('/carts',verifyTokenU,(req,res)=>{
   
    // try{
        let carts = req.session.cart
        console.log(carts)
    //     res.render('client-filledcart',{carts})
    // }
    // catch(e){
    //     console.log(e)
    // }
    res.render('client-filledcart')
})














module.exports =ExtraRouter;
