const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules

exports.Filemanager_GET = async(req,res)=>{
    res.render('app-file-manager')
}
exports.Invoice_GET = async(req,res)=>{
    res.render('page-invoice')
}
exports.Calendar_GET = async(req,res)=>{
    res.render('app-calendar')
}
exports.Analytics_GET = async(req,res)=>{
    res.render('app-analytics')
}
exports.MeetMyTeam_GET = async(req,res)=>{
    res.render('client-meet-my-team')
}
exports.ComingSoon_GET = async(req,res)=>{
    res.render('client-comingSoon')
}
exports.QualityAssured_GET = async(req,res)=>{
    res.render('client-qualityAssured')
}
exports.TermsAndConditions_GET = async(req,res)=>{
    res.render('client-termsAndConditions')
}
exports.PaymentOptions_GET = async(req,res)=>{
    res.render('client-paymentOptions')
}

exports.Blog_GET = async(req,res)=>{
    res.render('client-blog')
}
exports.vtour_GET = async(req,res)=>{
    res.render('client-virtual-tour')
}
