const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const bodyParser = require("body-parser")
const User = require("./../models/customer")
const Admin = require("./../models/admin")
const bcrypt = require('bcrypt');
const {verifyToken} = require('./../../middleware/verifytoken')
const passport = require('passport')
const LocalStrategy = require('passport-local')
var jwt = require('jsonwebtoken');
var session = require('express-session')
require('dotenv').config({ path: '../../.env' })
const nodemailer = require("nodemailer");
let app = express();



exports.Login_GET = async(req, res)=> {
    if(req.route.path=="/login")
    {
    res.render('client-Login')
    }
    else if(req.route.path="/admin/login"){
        let message={message:' ' }
        res.render('auth-sign-in',{message})
    }

};
exports.Login_POST = async(req, res)=> {
    console.log(req.body)
    try{
        const {email,password} = req.body;
        if(!email || !password) 
        {
            console.log("please enter the value")
        }
        let finduser;
        let userType;
        if(req.route.path =="/login")
        {
           finduser = await User.findOne({email:email})
           userType="user"
        }
        else
        {
           finduser = await Admin.findOne({email:email})   
           userType="admin"

        }
        if(!finduser)
        {
            console.log("This user doenst exists")
            res.redirect(req.route.path)
        }
        else
        {
            console.log(email,password)

            const isMatch = await bcrypt.compare(password,finduser.password)
            if(!isMatch)
            {
                console.log("invalid password")
               res.redirect(req.route.path)
            }
            else
            {
                if(userType=="admin")
                {
                    const token =  await finduser.generateAuthToken();
                    res.cookie("calligraphyideas", token);
                    console.log("login successfully")
                    res.render("/admin/index")
                }
                else if(userType=="user")
                {
                    const token =  await finduser.generateAuthToken();
                    res.cookie("calligraphyideas_u", token);
                    console.log("login successfully")
                    res.render("index")
                }
              
            }
        }

    }
    catch(err){ console.log(err)}
    
    
    console.log("bham")

};
exports.Signup_GET = async(req, res)=> {
    req.session.view=1;
    if(req.route.path=="/login")
    {
    res.render('client-Sign-Up')
    }
    else if(req.route.path="/admin/login"){
        res.render('client-Sign-Up')
    }

};
exports.Signup_POST = async(req, res)=> {
    console.log(req.body)
    if(req.body.password == req.body.cPassword)
    {
        if(req.route.path=="/signup")
        {
            let {username,gender,email,phone,streetAddress,city,district,state,country,pincode,password,cpassword,dob}=req.body;
            const user = new User({
                'username': username,
                'gender': gender,
                'email':email,
                'phone': phone,
                'streetAddress': streetAddress,
                'city': city,
                'district': district,
                'state': state,
                'country': country,
                'pincode': pincode,
                'password': password,
                'dob':dob,
            }) 
            await user.save();
    
        }
        else if(req.route.path=="/admin/signup")
        {
            const admin = new Admin({});
            
            await admin.save();
        }
     
    }
};
exports.User_Forget_password_GET = async(req, res,next)=> {
    res.render('client-forgetPassword')
};
exports.User_Forget_password_POST = async(req, res,next)=> {
    let {email} = req.body;
    finduser = await User.findOne({email:email})
    if(finduser)
    {
        console.log("vok"+finduser)
        const JWT_SECRET = "plmoknijb1234567890"
        const secret = JWT_SECRET+finduser.password 
        const payload={
            email:finduser.email,
            id:finduser.id
        }
        const token = jwt.sign(payload,secret,{expiresIn:'15m'})
        const link = `http://192.168.1.6:3000/reset-password/${finduser.id}/${token}`
        console.log(link)
        let transporter = nodemailer.createTransport({
  
            service:'gmail',
            auth: {
              user: 'calligraphyideasmail@gmail.com', // generated ethereal user
              pass: 'calligraphyideas@mail25', // generated ethereal password
            },
          });
        
          let mailOptions = {
              from:'calligraphyideasmail@gmail.com',
              to:finduser.email, 
              subject:'reset your password',
              text:`${link}`,
          };
        
          transporter.sendMail(mailOptions,function(err,info)
          {
              if(err){console.log(err)}
              else{console.log("Email send:"+info.response)}
          })
        res.send("password reset link is sent to youur email");

        console.log(req.body)
    }

}
exports.User_Create_new_password_GET = async(req, res,next)=> {
    let {id,token} = req.params;
    finduser = await User.findById(id)
    const JWT_SECRET = "plmoknijb1234567890"
    if(finduser)
    {
        console.log("checked")
        const secret = JWT_SECRET+finduser.password
        try
        {
            const payload = jwt.verify(token,secret)
            console.log("checked")
            res.render('client-createNewPassword')
        }
        catch(err)
        {
            console.log(err)
            console.log("checked")

        }
    }
    else
    {
        console.log('valid id')
    }

};
exports.User_Create_new_password_POST = async(req, res,next)=> {
    let {id,token} = req.params;
    finduser = await User.findById(id)
    const JWT_SECRET = "plmoknijb1234567890"
    if(finduser)
    {
        const secret = JWT_SECRET+finduser.password
        try
        {
            const payload = jwt.verify(token,secret)
            let {newPass,conPass}=req.body
            if(newPass==conPass)
            {
                newPass= await bcrypt.hash(newPass,12);
                await User.updateOne({_id:`${id}`}, {$set: {"password":`${newPass}`}})

            }
        }
        catch(err)
        {
            console.log(err)
        }
    }
    else
    {
        console.log('valid id')
    }

    console.log(req.body)
};
exports.Client_Manage_profile_GET= async(req, res)=>{
    let {id}=req.params;
    oldUserData = await User.findOne({"_id":id})
    console.log(oldUserData)
    res.render('client-user-profile',{"data":oldUserData})
}
exports.Client_Manage_profile_POST= async(req, res)=>{
    let {id} = req.params
    console.log(req.body)
    oldUserData = await User.findOne({"_id":id})
    let {username,gender,email,phone,streetAddress,city,district,state,country,pincode,dob}=req.body;
    await User.findByIdAndUpdate(id,{
                'username': username,
                'gender': gender,
                'email':email,
                'phone': phone,
                'streetAddress': streetAddress,
                'city': city,
                'district': district,
                'state': state,
                'country': country,
                
                'pincode': pincode,
                'password': oldUserData.password,
                'dob':dob,
    }).then(()=>{console.log("value updated");});

}
