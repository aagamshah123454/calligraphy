const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const bodyParser = require("body-parser")
const AdminLogin = require("../backend/models/admin")

require('./../backend/db')

const AdminLoginRouter = express.Router();

AdminLoginRouter.get('/admin/login',(req,res)=>
{
   
})
AdminLoginRouter.post('/admin/login',async(req,res)=> 
{
    let username = req.body.username;
    let password = req.body.password;
    
    let user = await AdminLogin.findOne({name:`${username}`})
  if(user!=null)
    {
        if(password===`${user.password}`)
        {
            res.render('index')
        }
        else
        {
            let message={
                message:'Password is incorrect'
            }
            
            res.render('auth-sign-in',{message})
        }
    }
    else
    {
        let message={
            message:"username doesn't exists"
        }
        
        res.render('auth-sign-in',{message})
    }
    console.log(user)
    res.send("fd")
})
AdminLoginRouter.get('/admin/login/forgetPassword',(req,res)=>
{
    let message = {
        message:"This email doesn't exists"
   }
        res.render('auth-forgot-password',{message})
})
AdminLoginRouter.post('/admin/login/forgetPassword',async(req,res)=>
{
        let email=req.body.emailFind
        console.log(email)
        let user = await AdminLogin.findOne({'email':`${email}`})
        console.log(user)
        if(user==null){  
           let message = {
                message:"This email doesn't exists"
           }
           res.render('auth-forgot-password',{message})
        }   
        else
        {
            res.redirect('auth-reset-password');
        }
        
})
AdminLoginRouter.get('/admin/login/resetPassword',(req,res)=>
{
   res.render('auth-reset-password');
})

module.exports=AdminLoginRouter;