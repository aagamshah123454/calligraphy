const { response } = require("express");
const express = require("express"); //request for express from node modules
const mongoose = require("mongoose"); //request for mongoose from node modules
const bodyParser = require("body-parser");
const app = express();
const Category = require("./../models/category");
const Color = require("./../models/color");
const Size = require("./../models/size");
const Material = require("./../models/material");
let Product = require("./../models/product")
var validate = require("validate.js");
const e = require("express");
require("./../db");
const axios = require("axios");

exports.categoryList_GET = async (req, res) => {
    let categories = await Category.find({});
    res.render("app-categories-list", { categories });
};
exports.newCategory_GET = async (req, res) => {
    let categories = await Category.find({});
    let noOfImages = 3;
    let url = "/admin/category/new-category";
    let imageUrl = "";

    let category = {
        name: "",
        image: "",
        description: "",
        visibility: {
            visibility_type: "",
            publish_at: "",
        },
        keywords: "",
        slug: "",
        parentCategory: "",
        seoPageTitle: "",
        seoMetaDescription: "",
        hidden: 1,
    };
    res.render("app-add-new-category", { categories: categories, category: category, noOfImages: noOfImages, url: url, imageUrl: imageUrl });
};
exports.newCategory_POST = async (req, res) => {
    let checkExistenceOfCategory = await Category.find({ name: req.body.name }, { runValidators: true });
    if (!(checkExistenceOfCategory && Object.keys(checkExistenceOfCategory).length === 0 && Object.getPrototypeOf(checkExistenceOfCategory) === Object.prototype)) {
        console.log(req.files);

        let { image1, image2, image3, name, slug, description, parentCategory, seoPageTitle, seoMetaDescription, keywords, visibility_type, publish_at } = req.body;
        let images = [];

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
            } else {
                images[2] = "";
            }
        } else {
            images = "";
        }
        function upload(args1, args2) {
            args1.mv("storage/categories/" + args2, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("file uploaded");
                }
            });
        }
    

        function upload(args1, args2) {
            args1.mv("storage/categories/" + args2, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("file uploaded");
                }
            });
        }

        let category = new Category({
            name: name,
            image: images,
            description: description,
            visibility: {
                visibility_type: visibility_type,
                publish_at: publish_at,
            },
            keywords: keywords,
            slug: slug,
            parentCategory: parentCategory,
            seoPageTitle: seoPageTitle,
            seoMetaDescription: seoMetaDescription,
            hidden: 1,
        });

        await category.save();
        res.redirect("/admin/category/category-list");
        console.log(category);
    } else {
    }
};
exports.editCategory_GET = async (req, res) => {
    try {
        let categories = await Category.find({});
        let category = await Category.findById(req.params.id);
        let url = `/admin/category/${req.params.id}/edit`;
        let imageUrl = "/storage/categories/";
        let noOfImages = 3;

        res.render("app-add-new-category", { category: category, categories: categories, url: url, noOfImages: noOfImages, imageUrl: imageUrl });
    } catch (err) {}
};
exports.editCategory_POST = async (req, res) => {
    let oldCategory = await Category.findById(req.params.id);
    let images = [];

    if (req.files) {
        if (req.files.image1) {
            let fileImage1 = req.files.image1;
            fileImageName1 = fileImage1.name;
            upload(fileImage1, fileImageName1);
            images[0] = fileImageName1;
        } else {
            images[0] =oldCategory.image[0];
        }
        if (req.files.image2) {
            let fileImage2 = req.files.image2;
            fileImageName2 = fileImage2.name;
            upload(fileImage2, fileImageName2);
            images[1] = fileImageName2;
        } else {
            images[1] =oldCategory.image[1];
        }
        if (req.files.image3) {
            let fileImage3 = req.files.image3;
            fileImageName3 = fileImage3.name;
            upload(fileImage3, fileImageName3);
            images[2] = fileImageName3;
        } else {
            images[2] =oldCategory.image[2];
        }
    } else {
        images = [oldCategory.image[0],oldCategory.image[1],oldCategory.image[2]];
    }
    function upload(args1, args2) {
        args1.mv("storage/categories/" + args2, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("file uploaded");
            }
        });
    }


    let { name, slug, description, parentCategory, seoPageTitle, seoMetaDescription, keywords, visibility_type, publish_at } = req.body;
    let newCategory = {
        name: name,
        image: images,
        description: description,
        visibility: {
            visibility_type: visibility_type,
            publish_at: publish_at,
        },
        keywords: keywords,
        slug: slug,
        parentCategory: parentCategory,
        seoPageTitle: seoPageTitle,
        seoMetaDescription: seoMetaDescription,
        hidden: 1,
    };

    console.log(newCategory);
    await Category.findByIdAndUpdate(req.params.id, newCategory);
    res.redirect("/admin/category/category-list");
};
exports.deleteCategory_GET = async (req, res) => {
    let id = req.params.id;
    await Category.findByIdAndDelete(id);
    res.redirect("/admin/category/category-list");
};

exports.clientCollectionCategory_GET = async (req, res) => {

    // console.log(req.params.categoryName);
    let categoryActive = await Category.findOne({"name":req.params.categoryName});
    let subcategories = await Category.find({"parentCategory":req.params.categoryName})
    let products = await Product.find({"categoryName":req.params.categoryName});
    let categories = await Category.find({"parentCategory":"none"});
    let colors = await Color.find({});
    let sizes = await Size.find({});
    let materials = await Material.find({});
    let imageURL = '/storage/products/'
    
    console.log("jbkj"+categoryActive.name);
    res.render("client-collection",{'imageURL':imageURL,'products':products,'subcategories':subcategories,'categoryActive':categoryActive,'categories':categories,'colors':colors,'sizes':sizes,'materials':materials});
};
