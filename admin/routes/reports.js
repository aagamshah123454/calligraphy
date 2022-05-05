const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const ReportController = require("./../backend/controllers/reports.Controller")
const {verifyToken} = require('../middleware/verifytoken')





const reportRouter = express.Router();


reportRouter.get('/admin/report/category',verifyToken,ReportController.category_report_GET)
reportRouter.get('/admin/report/order',verifyToken,ReportController.order_report_GET)
reportRouter.get('/admin/report/user',verifyToken,ReportController.user_report_GET)
reportRouter.get('/admin/report/product',verifyToken,ReportController.product_report_GET)

reportRouter.post('/admin/report/category',verifyToken,ReportController.category_report_POST)
reportRouter.post('/admin/report/order',verifyToken,ReportController.order_report_POST)
reportRouter.post('/admin/report/user',verifyToken,ReportController.user_report_POST)
reportRouter.post('/admin/report/product',verifyToken,ReportController.product_report_POST)


















module.exports =reportRouter;
