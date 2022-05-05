const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const bodyParser = require("body-parser")
const FAQ = require("../backend/models/faq")
const FAQController = require("./../backend/controllers/FAQController")
const {verifyToken} = require('../middleware/verifytoken')



const FAQRouter = express.Router();
FAQRouter.use(bodyParser.urlencoded({ extended: true }));


FAQRouter.get('/admin/FAQs/FAQ-list',verifyToken,FAQController.FAQList_GET)
FAQRouter.get('/admin/FAQs/:id/delete',verifyToken,FAQController.FAQDelete_GET)

FAQRouter.get('/admin/FAQs/new-FAQ',verifyToken,FAQController.FAQNew_GET)
FAQRouter.post('/admin/FAQs/new-FAQ',verifyToken,FAQController.FAQNew_POST)

FAQRouter.get('/pages/FAQs',FAQController.FAQClient_GET)

module.exports =FAQRouter;
