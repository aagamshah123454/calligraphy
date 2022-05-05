const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const bodyParser = require("body-parser")
const Customer = require("./../models/customer")
const Order = require('./../models/order')


require('./../db')

exports.customerList_GET = async(req,res)=>{
    let Customers = await Customer.find({})
    res.render('app-customers-list',{Customers});
}
exports.customerDetails_GET = async(req,res)=>{
    let id = req.params.id;
    let customer = await Customer.findById(id);
    let orders = await Order.find({"userId":id});
    console.log(customer,orders)
    res.render('app-customer',{"customer":customer,"orders":orders});
}