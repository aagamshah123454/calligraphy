const { response } = require('express');
const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const Category = require('./../models/category')
const Product = require('./../models/product')
const User = require("./../models/customer")

exports.category_report_GET = async(req,res)=>{
    let data={};
    res.render('app-report-category',{"data":data})
}
exports.order_report_GET = async(req,res)=>{
    res.render('app-report-order')
}
exports.product_report_GET = async(req,res)=>{
    res.render('app-report-product')
}
exports.user_report_GET = async(req,res)=>{
    res.render('app-report-user')
}
exports.category_report_POST = async(req,res)=>{
    let {parentCategory,categoryVisibility}=req.body
    console.log(req.body)
    let data;
    if(parentCategory=='')
    {
         data = await Category.find({'categoryVisibility':categoryVisibility})
    }
    else
    {

        data = await Category.find({$and:[
            {'parentCategory':parentCategory},
            {'categoryVisibility':categoryVisibility}
            ]})
    }
   res.send(data);
}
exports.order_report_POST = async(req,res)=>{
    console.log(req.body)

}
exports.product_report_POST = async(req,res)=>{
    console.log(req.body)
    let {parentCategory,brands}=req.body
    let data
    if((parentCategory=="") && (brands==""))
    {
        data=await Product.find({})
        res.send(data)
    }
   
    if((parentCategory!="") && (brands!=""))
    {
        data = await Product.find({'categoryName':parentCategory,'brands':brands})
        res.send(data)
    }
    
    if(parentCategory=="")
    {
       data = await Product.find({'brands':brands})
       res.send(data)
    }
      
    if(brands=="")
    {
        console.log("entered")
       data = await Product.find({'categoryName':parentCategory})
       res.send(data)
    }
    

}
exports.user_report_POST = async(req,res)=>{
    console.log(req.body)
    // let {country,city,state,gender} = req.body
    let {country, city,state,gender}=req.body;
    let Arr=['country','city','state','gender']
    let newArr=[country,city,state,gender]
    let data;
    if((country=="")&&(city=="")&&(state=="")&&(gender==""))
    {
        data= await User.find({});
        res.send(data)
    }
    else
    {
        if((country!="")&&(city=="")&&(state=="")&&(gender==""))
        {
            data= await User.find({'country':country});
            res.send(data)
        }
        else if((country!="")&&(city!="")&&(state=="")&&(gender==""))
        {
            data= await User.find({'country':country,'city':city});
            res.send(data)
        }
        else if((country!="")&&(city!="")&&(state!="")&&(gender==""))
        {
            data= await User.find({'country':country,'city':city,'state':state});
            res.send(data)
        }
        else if((country=="")&&(city!="")&&(state=="")&&(gender==""))
        {
            data= await User.find({'city':city});
            res.send(data)
        }
        else if((country!="")&&(city!="")&&(state=="")&&(gender==""))
        {
            data= await User.find({'city':city,'country':country});
            res.send(data)
        }
        else if((country!="")&&(city!="")&&(state!="")&&(gender==""))
        {
            data= await User.find({'city':city,'country':country});
            res.send(data)
        }
        else if((country=="")&&(city=="")&&(state!="")&&(gender==""))
        {
            data= await User.find({'state':state});
            res.send(data)
        }
        else if((country!="")&&(city=="")&&(state!="")&&(gender==""))
        {
            data= await User.find({'state':state,'country':country});
            res.send(data)
        }
        
    }

}

