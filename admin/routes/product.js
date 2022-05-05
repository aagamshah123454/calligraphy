const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const ProductController = require('./../backend/controllers/productController')
const {verifyToken} = require('../middleware/verifytoken')





const ProductRouter = express.Router();


ProductRouter.get('/admin/product/product-list',verifyToken,ProductController.productList_GET)

ProductRouter.post('/admin/product/new-product',verifyToken,ProductController.newProduct_POST)
ProductRouter.get('/admin/product/new-product',verifyToken,ProductController.newProduct_GET)

ProductRouter.get('/admin/product/:id/edit',verifyToken,ProductController.editProduct_GET)
ProductRouter.post('/admin/product/:id/edit',verifyToken,ProductController.editProduct_POST)

ProductRouter.get('/admin/product/:id/delete',verifyToken,ProductController.deleteProduct_GET)
ProductRouter.get('/collections/:categoryName/:id',ProductController.clientProduct_GET)

ProductRouter.post('/collections/:categoryName/:id/submit-review',ProductController.submitReview_POST)


module.exports=ProductRouter;