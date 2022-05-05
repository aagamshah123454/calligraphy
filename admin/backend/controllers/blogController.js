const { response } = require("express");
const express = require("express"); //request for express from node modules
const mongoose = require("mongoose"); //request for mongoose from node modules
const bodyParser = require("body-parser");
const app = express();
const Blog = require("./../models/blog");
const Category = require('./../models/category')
require("./../db");


exports.blogList_GET = async (req, res) => {
    let blogs = await Blog.find({});
    res.render('app-blog-list',{blogs})
  
   
    
};
exports.newblog_GET = async (req, res) => {
    let url="/admin/blogs/new-blog";
    let noOfImages = 3;
    let categories= await(Category.find({}));
    let imageUrl = ""
    let blog={
        "keywords":['a','b'],
        "image":['','',''],
        "author":{
            name:"",
            authorDescription:"",
        }
    };   
    res.render("app-add-new-blog",{"blog":blog,"url":url,"categories":categories,"noOfImages":noOfImages,'imageUrl':imageUrl})
};
exports.newblog_POST = async (req, res) => {
    let {title,subTitle,slug,content,authorName,authorDescription,profile_image_alt_text,seoPageTitle,seoMetaDescription,visibility_type,publish_at,parentCategory,keywords}=req.body
    let images=[];
 
    if (req.files) {
        if (req.files.image1) {
            let fileImage1 = req.files.image1;
            fileImageName1 = fileImage1.name;
            upload(fileImage1, fileImageName1);
            images[0] = fileImageName1;
        } else {
            images[0] ="";
        }
        if (req.files.image2) {
            let fileImage2 = req.files.image2;
            fileImageName2 = fileImage2.name;
            upload(fileImage2, fileImageName2);
            images[1] = fileImageName2;
        } else {
            images[1] = "";
        }
        if (req.files.image3) {
            let fileImage3 = req.files.image3;
            fileImageName3 = fileImage3.name;
            upload(fileImage3, fileImageName3);
            images[2] = fileImageName3;
        } 
        else {
            images[2] = "";
        }
        if (req.files.author_profile_image) {
            let author_profile_image = req.files.author_profile_image;
            author_profile_image_path = author_profile_image.name;
            upload(author_profile_image, author_profile_image_path);
        } else {
            author_profile_image_path ="";
        }
    } else {
        images = "";
    }

  
      
    

    function upload(args1, args2) {
        args1.mv("storage/blogs/" + args2, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("file uploaded");
            }
        });
    }
    let blog ={
        "title":title,
        "subTitle":subTitle,
        "slug":slug,
        "image":images,
        "content":content,
     
        "author":{
            "name":authorName,
            "author_profile_photo":author_profile_image_path,
            "authorDescription":authorDescription,
            "profile_image_alt_text":profile_image_alt_text,
        },
        "seoPageTitle":seoPageTitle,
        "seoMetaDescription":seoMetaDescription,
        "visibility":
            {
                "visibility_type":visibility_type,
                "publish_at":publish_at
            }
        ,"category":parentCategory,
        "keywords":keywords,
    }
    let newBlog = new Blog(blog)
    await newBlog.save();
    res.redirect('/admin/blogs/blog-list')
};
exports.editblog_GET = async (req, res) => {

    let oldBlog = await Blog.findById(req.params.id);

    let url=`/admin/blogs/${req.params.id}/edit`;
    let noOfImages = 3;
    let categories= await(Category.find({}));
    let imageUrl = "/storage/blogs/"
    let blog=oldBlog;  
    console.log(blog)
    res.render("app-add-new-blog",{"blog":blog,"url":url,"categories":categories,"noOfImages":noOfImages,'imageUrl':imageUrl})   
}
exports.editblog_POST = async (req, res) => {
    let oldBlog = await Blog.findById(req.params.id);
    let {title,subTitle,slug,content,authorName,authorDescription,profile_image_alt_text,seoPageTitle,seoMetaDescription,visibility_type,publish_at,parentCategory,keywords}=req.body
    let images=[];
 
    if (req.files) {
        if (req.files.image1) {
            let fileImage1 = req.files.image1;
            fileImageName1 = fileImage1.name;
            upload(fileImage1, fileImageName1);
            images[0] = fileImageName1;
        } else {
            console.log("Entered",oldBlog.image[0])
            images[0] =oldBlog.image[0];
        }
        if (req.files.image2) {
            let fileImage2 = req.files.image2;
            fileImageName2 = fileImage2.name;
            upload(fileImage2, fileImageName2);
            images[1] = fileImageName2;
        } else {
            console.log("Entered",oldBlog.image[1])
            images[1] =oldBlog.image[1];

        }
        if (req.files.image3) {
            let fileImage3 = req.files.image3;
            fileImageName3 = fileImage3.name;
            upload(fileImage3, fileImageName3);
            images[2] = fileImageName3;
        } 
        else {
            images[2] =oldBlog.image[2];
            
        }
        if (req.files.author_profile_image) {
            let author_profile_image = req.files.author_profile_image;
            author_profile_image_path = author_profile_image.name;
            upload(author_profile_image, author_profile_image_path);
        } else {
            author_profile_image_path =oldBlog.author.author_profile_image
        }
    } else {
        images = [oldBlog.image[0],oldBlog.image[1],oldBlog.image[2]];
        author_profile_image_path =oldBlog.author.author_profile_image
    }

  
      
    

    function upload(args1, args2) {
        args1.mv("storage/blogs/" + args2, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("file uploaded");
            }
        });
    }
    let blog ={
        "title":title,
        "subTitle":subTitle,
        "slug":slug,
        "image":images,
        "content":content,
     
        "author":{
            "name":authorName,
            "author_profile_photo":author_profile_image_path,
            "authorDescription":authorDescription,
            "profile_image_alt_text":profile_image_alt_text,
        },
        "seoPageTitle":seoPageTitle,
        "seoMetaDescription":seoMetaDescription,
        "visibility":
            {
                "visibility_type":visibility_type,
                "publish_at":publish_at
            }
        ,"category":parentCategory,
        "keywords":keywords,
    }
   await Blog.findByIdAndUpdate(req.params.id,blog)
    res.redirect('/admin/blogs/blog-list')
};
exports.deleteblog_GET = async (req, res) => {
    res.send("delete blog")
};
exports.client_newblog_GET=async (req, res) => {
    let {id} =req.params;
    let blogs = await Blog.find().sort({_id:1}).limit(50);
    let imageURL="/storage/blogs/"
    console.log(id)
    let blog = await Blog.findById(id)
    console.log(blog);
    res.render('client-blog',{'blog':blog,'imageURL':imageURL,'blogs':blogs});
}

