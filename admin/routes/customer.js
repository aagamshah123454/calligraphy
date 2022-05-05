const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const CustomerController = require('./../backend/controllers/customerController')
const {verifyToken} = require('../middleware/verifytoken')




const customerRouter = express.Router();

customerRouter.get('/admin/customer/:id/detail',verifyToken,CustomerController.customerDetails_GET)
customerRouter.get('/admin/customer/customer-list',verifyToken,CustomerController.customerList_GET)
module.exports=customerRouter;