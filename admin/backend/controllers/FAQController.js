const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const bodyParser = require("body-parser")
const FAQ = require("./../models/faq")

require('./../db')

exports.FAQList_GET = async(req,res)=>{
    let faqs = await FAQ.find({})
    res.render('page-faq',{faqs});
}
exports.FAQNew_GET = async(req,res)=> {
    res.render('newFAQ');
}
exports.FAQNew_POST = async(req,res)=>{
    const faq = new FAQ(req.body);
    
    req.bodyisActive = true
    await faq.save();
    console.log(req.body)
    res.redirect('/admin/FAQs/FAQ-list');
}
exports.FAQDelete_GET = async(req,res)=>{
    let id = req.params.id;
    console.log(id)
    await FAQ.findByIdAndDelete(id)
    res.redirect('/admin/FAQs/FAQ-list');
}
exports.FAQClient_GET = async(req,res)=>{
    let FAQS = await FAQ.find({});
    res.render('client-faq',{"FAQS":FAQS})
}