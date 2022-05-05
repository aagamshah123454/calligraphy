const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const OrderController= require('./../backend/controllers/orderController')
const {verifyToken} = require('../middleware/verifytoken')


const orderRouter = express.Router();

orderRouter.get("/admin/order/order-list",verifyToken,OrderController.orderList_GET)
orderRouter.get("/admin/order/detail",verifyToken,OrderController.orderDetail_GET)
orderRouter.get("/:id/cart",OrderController.client_Cart_GET)
orderRouter.get("/:id/orderTracking",OrderController.orderTrackings_GET)




module.exports =orderRouter;
