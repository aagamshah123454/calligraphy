const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const bodyParser = require("body-parser")
const Order = require("./../models/order")
const User = require("./../models/customer")
const Cart = require("./../models/cart")

require('./../db')

exports.orderList_GET = async(req,res)=>{
    let orders = await Order.find({});
    let finalInformation = [];
    let cartInformation
    for(let order of orders){
        let userInformation = [];
        let user = await User.findById(order.o_userId,{username:1});
        let cart = await Cart.findById(order.o_cart_Id,{ca_finalAmount:1})
        console.log(user)
        userInformation.push(user);
        userInformation.push(order);
        userInformation.push(cart);

        finalInformation.push(userInformation);
    }
    console.log(finalInformation)
    res.render('app-orders-list');
}
exports.orderDetail_GET=async(req,res)=>{
     res.render('app-order')
}
exports.client_Cart_GET = async (req,res)=>
{
    res.render('client-filledCart')
}

exports.orderTrackings_GET=async(req,res)=>
{
    res.render('client-ordeTracking')
}