
const express = require('express')//request for express from node modules
let CategoryController = require('./../backend/controllers/categoryController')
const {verifyToken} = require('../middleware/verifytoken')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })



const categoryRouter = express.Router();


categoryRouter.get('/admin/category/category-list',verifyToken,CategoryController.categoryList_GET);

categoryRouter.get('/admin/category/new-category',verifyToken,CategoryController.newCategory_GET);
categoryRouter.post('/admin/category/new-category',verifyToken,CategoryController.newCategory_POST);

categoryRouter.get('/admin/category/:id/edit',verifyToken,CategoryController.editCategory_GET);
categoryRouter.post('/admin/category/:id/edit',verifyToken,CategoryController.editCategory_POST);


categoryRouter.get('/admin/category/:id/delete',verifyToken,CategoryController.deleteCategory_GET)
categoryRouter.get('/collections/:categoryName/',CategoryController.clientCollectionCategory_GET)




module.exports = categoryRouter;