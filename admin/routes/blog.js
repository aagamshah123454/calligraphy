
const express = require('express')//request for express from node modules
let BlogController = require('./../backend/controllers/blogController')
const {verifyToken} = require('../middleware/verifytoken')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
 

var urlencodedParser = bodyParser.urlencoded({ extended: false })



const blogRouter = express.Router();

blogRouter.get('/blogs/:id',BlogController.client_newblog_GET)
blogRouter.get('/admin/blogs/blog-list',verifyToken,BlogController.blogList_GET);


blogRouter.get('/admin/blogs/new-blog',verifyToken,BlogController.newblog_GET);
blogRouter.post('/admin/blogs/new-blog',verifyToken,BlogController.newblog_POST);

blogRouter.get('/admin/blogs/:id/edit',verifyToken,BlogController.editblog_GET);
blogRouter.post('/admin/blogs/:id/edit',verifyToken,BlogController.editblog_POST);

blogRouter.get('/admin/blogs/:id/delete',verifyToken,BlogController.deleteblog_GET)







module.exports = blogRouter;