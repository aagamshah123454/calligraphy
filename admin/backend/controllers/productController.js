const express = require('express')//request for express from node modules
const mongoose = require('mongoose')//request for mongoose from node modules
const bodyParser = require("body-parser")
const Product = require("./../models/product")
const Colors = require("./../models/color")
const Category = require("./../models/category") 
const Sizes = require("./../models/size") 
const Brands = require("./../models/brand")
const Material = require("./../models/material")


require('./../db')

exports.productList_GET = async(req,res)=>{
    let imageURL = '/storage/products/'
    let products = await Product.find({});
    res.render('app-products-list',{"products":products,"imageURL":imageURL});
}
exports.newProduct_GET = async(req,res)=>{
    let colors = await Colors.find({});
    let sizes  = await Sizes.find({});
    let brands = await Brands.find({});
    let category = await Category.find({});
    let material = await Material.find({});
    let imageURL = '/storage/products/'
    let productDetail={
        'title':"",
        'description':"",
        'image':[
            {"imagePath":"bocklike","altText":"boccocc"},
            {"imagePath":"","altText":""},
            {"imagePath":"","altText":""},
            {"imagePath":"","altText":""}
        ],
        'categoryName':"",
        'tags':"",
        'features':"",
        'slug':"",
        'SKU':{
            'SKUName':"",
            'basePrice':"" 
               },
         'options':[
             {
                'material':"",
                'size':"",
                'quantity':"",
                'colors':"",
                'price':{
                            'digitalPrice':"",
                            'handWrittenPrice':"",
                            'currency':"",
                                     'discount':{
                                                'discountType':"",
                                                'discountValue':""
                                                }
                         }

             },
             {
                'material':"",
                'size':"",
                'quantity':"",
                'colors':"",
                'price':{
                            'digitalPrice':"",
                            'handWrittenPrice':"",
                            'currency':"",
                                     'discount':{
                                                'discountType':"",
                                                'discountValue':""
                                                }
                         }

             },
             {
                'material':"",
                'size':"",
                'quantity':"",
                'colors':"",
                'price':{
                            'digitalPrice':"",
                            'handWrittenPrice':"",
                            'currency':"",
                                     'discount':{
                                                'discountType':"",
                                                'discountValue':""
                                                }
                         }

             },
             {
                'material':"",
                'size':"",
                'quantity':"",
                'colors':"",
                'price':{
                            'digitalPrice':"",
                            'handWrittenPrice':"",
                            'currency':"",
                                     'discount':{
                                                'discountType':"",
                                                'discountValue':""
                                                }
                         }

             },
            
         ],
        'gltfPath':"",
        'seoPageTitle':"", 
        'seoPageDescription':"",
        'brands':""
    
        
    }
    console.log(productDetail.options[0].material);
    let url=""

    res.render('app-product-new',{'colors':colors,'sizes':sizes,'brands':brands,'category':category,"material":material,"productDetail":productDetail,"url":url,"imageURL":imageURL}); 
}
exports.newProduct_POST = async(req,res)=>{
    let {title,slug,description,seoPageTitle,seoPageDescription,categoryName,brands,SKU,SKU_price}=req.body
    let {product_tags} = req.body;
    let {product_features} = req.body;
    let {image1,image2,image3,image4} = req.body;
    let {image_alt_text1,image_alt_text2,image_alt_text3,image_alt_text4}= req.body;
    let {discount_type1,discount_amount1,discount_type2,discount_amount2,discount_type3,discount_amount3,discount_type4,discount_amount4}=req.body;
    let {digital_price1,handwritten_price1,currency_type1,digital_price2,handwritten_price2,currency_type2,digital_price3,handwritten_price3,currency_type3,digital_price4,handwritten_price4,currency_type4}=req.body;
    let {parent_ProductColors1,parent_ProductColors2,parent_ProductColors3,parent_ProductColors4, parent_ProductSize1, parent_ProductSize2, parent_ProductSize3, parent_ProductSize4,product_quantity1,product_quantity2,product_quantity3,product_quantity4, parent_Material1, parent_Material2, parent_Material3, parent_Material4,product_price1,product_price2,product_price3,product_price4}=req.body;
    let image=[{image1,image_alt_text1},{image2,image_alt_text2},{image3,image_alt_text3},{image4,image_alt_text4}];
   let images=[]

    if (req.files) {
        if (req.files.image1) {
            let fileImage1 = req.files.image1;
            fileImageName1 = fileImage1.name;
            upload(fileImage1, fileImageName1);
            images[0] = {"imagePath":fileImageName1,"altText":image_alt_text1};
        } else {
            images[0] = {};

        }
        if (req.files.image2) {
            let fileImage2 = req.files.image2;
            fileImageName2 = fileImage2.name;
            upload(fileImage2, fileImageName2);
            images[1] = {"imagePath":fileImageName2,"altText":image_alt_text2};
        } else {
            
            images[1] = {};

        }
        if (req.files.image3) {
            let fileImage3 = req.files.image3;
            fileImageName3 = fileImage3.name;
            upload(fileImage3, fileImageName3);
            images[2] = {"imagePath":fileImageName3,"altText":image_alt_text3};
        } else {
            images[2] = {};
        }
        if (req.files.image4) {
            let fileImage4 = req.files.image4;
            fileImageName4 = fileImage4.name;
            upload(fileImage4, fileImageName4);
            images[3] = {"imagePath":fileImageName4,"altText":image_alt_text4};
        } else {
            images[3] = {};
        }
    } else {
        images = "";
    }
    console.log(images)
    function upload(args1, args2) {
        args1.mv("storage/products/" + args2, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("file uploaded");
            }
        });
    }
    let product = new Product({
        'title':title,
        'description':description,
        'image':images,
        'categoryName':categoryName,
        'tags':product_tags,
        'features':product_features,
        'slug':slug,
        'SKU':{
            'SKUName':SKU,
            'basePrice': SKU_price 
               },
         'options':[
             {
                'material':parent_Material1,
                'size':parent_ProductSize1,
                'quantity':product_quantity1,
                'colors':parent_ProductColors1,
                'price':{
                            'digitalPrice':digital_price1,
                            'handWrittenPrice':handwritten_price1,
                            'currency':currency_type1,
                                     'discount':{
                                                'discountType':discount_type1,
                                                'discountValue':discount_amount1
                                                }
                         }

             },
             {
                'material':parent_Material2,
                'size':parent_ProductSize2,
                'quantity':product_quantity2,
                'colors':parent_ProductColors2,
                'price':{
                            'digitalPrice':digital_price2,
                            'handWrittenPrice':handwritten_price2,
                            'currency':currency_type2,
                                     'discount':{
                                                'discountType':discount_type2,
                                                'discountValue':discount_amount2
                                                }
                         }

             },
             {
                'material':parent_Material3,
                'size':parent_ProductSize3,
                'quantity':product_quantity3,
                'colors':parent_ProductColors3,
                'price':{
                            'digitalPrice':digital_price3,
                            'handWrittenPrice':handwritten_price3,
                            'currency':currency_type3,
                                     'discount':{
                                                'discountType':discount_type3,
                                                'discountValue':discount_amount3
                                                }
                         }

             },
             {
                'material':parent_Material4,
                'size':parent_ProductSize4,
                'quantity':product_quantity4,
                'colors':parent_ProductColors4,
                'price':{
                            'digitalPrice':digital_price4,
                            'handWrittenPrice':handwritten_price4,
                            'currency':currency_type4,
                                     'discount':{
                                                'discountType':discount_type4,
                                                'discountValue':discount_amount4
                                                }
                         }

             },
            
         ],
        'gltfPath':"ew",
        'seoPageTitle':seoPageTitle, 
        'seoPageDescription':seoPageDescription,
        'brands':brands
    
        
    })
    
    await product.save()
    console.log(JSON.stringify(product));
    // console.log(options)
    res.redirect('/admin/product/product-list');
}
exports.editProduct_GET = async(req,res)=>{
    let url=`/admin/product/${req.params.id}/edit`
    let imageURL="/storage/products/"
    let id= req.params.id;
    let product = await Product.findById(id);
    let categories = await Category.find({});
    let brands = await Brands.find({});
    let colors = await Colors.find({});
    let sizes = await Sizes.find({});
    let material = await Material.find({});

    res.render('app-product-new',{'productDetail':product,'category':categories,'material':material,'brands':brands,'colors':colors,'sizes':sizes,'imageURL':imageURL});
}
exports.editProduct_POST = async(req,res)=>{
    let id= req.params.id;
    let product = await Product.findById(id);
    let updatedCustomer = req.body;
    let {title,slug,description,seoPageTitle,seoPageDescription,categoryName,brands,SKU,SKU_price}=req.body
    let {product_tags} = req.body;
    let {product_features} = req.body;
    let {image1,image2,image3,image4} = req.body;
    let {image_alt_text1,image_alt_text2,image_alt_text3,image_alt_text4}= req.body;
    let {discount_type1,discount_amount1,discount_type2,discount_amount2,discount_type3,discount_amount3,discount_type4,discount_amount4}=req.body;
    let {digital_price1,handwritten_price1,currency_type1,digital_price2,handwritten_price2,currency_type2,digital_price3,handwritten_price3,currency_type3,digital_price4,handwritten_price4,currency_type4}=req.body;
    let {parent_ProductColors1,parent_ProductColors2,parent_ProductColors3,parent_ProductColors4, parent_ProductSize1, parent_ProductSize2, parent_ProductSize3, parent_ProductSize4,product_quantity1,product_quantity2,product_quantity3,product_quantity4, parent_Material1, parent_Material2, parent_Material3, parent_Material4,product_price1,product_price2,product_price3,product_price4}=req.body;

    let images=[]
    console.log(product.image[0].imagePath)
    if (req.files) {
        if (req.files.image1) {
            let fileImage1 = req.files.image1;
            fileImageName1 = fileImage1.name;
            upload(fileImage1, fileImageName1);
            images[0] = {"imagePath":fileImageName1,"altText":image_alt_text1};
        } else {
            images[0] = {"imagePath":product.image[0].imagePath,"altText":product.image[0].altText};

        }
        if (req.files.image2) {
            let fileImage2 = req.files.image2;
            fileImageName2 = fileImage2.name;
            upload(fileImage2, fileImageName2);
            images[1] = {"imagePath":fileImageName2,"altText":image_alt_text2};
        } else {
            
            images[1] = {"imagePath":product.image[1].imagePath,"altText":product.image[1].altText};


        }
        if (req.files.image3) {
            let fileImage3 = req.files.image3;
            fileImageName3 = fileImage3.name;
            upload(fileImage3, fileImageName3);
            images[2] = {"imagePath":fileImageName3,"altText":image_alt_text3};
        } else {
            images[2] = {"imagePath":product.image[2].imagePath,"altText":product.image[2].altText};

        }
        if (req.files.image4) {
            let fileImage4 = req.files.image4;
            fileImageName4 = fileImage4.name;
            upload(fileImage4, fileImageName4);
            images[3] = {"imagePath":fileImageName4,"altText":image_alt_text4};
        } else {
            images[3] = {"imagePath":product.image[3].imagePath,"altText":product.image[3].altText};

        }
    } else {
        images[0] = {"imagePath":product.image[0].imagePath,"altText":product.image[0].altText};
        images[1] = {"imagePath":product.image[1].imagePath,"altText":product.image[1].altText};
        images[2] = {"imagePath":product.image[2].imagePath,"altText":product.image[2].altText};
        images[3] = {"imagePath":product.image[3].imagePath,"altText":product.image[3].altText};


    }
    console.log(images)
    function upload(args1, args2) {
        args1.mv("storage/products/" + args2, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("file uploaded");
            }
        });
    }

    await Product.findByIdAndUpdate(id,{
        'title':title,
        'description':description,
        'image':images,
        'categoryName':categoryName,
        'tags':product_tags,
        'features':product_features,
        'slug':slug,
        'SKU':{
            'SKUName':SKU,
            'basePrice': SKU_price 
               },
         'options':[
             {
                'material':parent_Material1,
                'size':parent_ProductSize1,
                'quantity':product_quantity1,
                'colors':parent_ProductColors1,
                'price':{
                            'digitalPrice':digital_price1,
                            'handWrittenPrice':handwritten_price1,
                            'currency':currency_type1,
                                     'discount':{
                                                'discountType':discount_type1,
                                                'discountValue':discount_amount1
                                                }
                         }

             },
             {
                'material':parent_Material2,
                'size':parent_ProductSize2,
                'quantity':product_quantity2,
                'colors':parent_ProductColors2,
                'price':{
                            'digitalPrice':digital_price2,
                            'handWrittenPrice':handwritten_price2,
                            'currency':currency_type2,
                                     'discount':{
                                                'discountType':discount_type2,
                                                'discountValue':discount_amount2
                                                }
                         }

             },
             {
                'material':parent_Material3,
                'size':parent_ProductSize3,
                'quantity':product_quantity3,
                'colors':parent_ProductColors3,
                'price':{
                            'digitalPrice':digital_price3,
                            'handWrittenPrice':handwritten_price3,
                            'currency':currency_type3,
                                     'discount':{
                                                'discountType':discount_type3,
                                                'discountValue':discount_amount3
                                                }
                         }

             },
             {
                'material':parent_Material4,
                'size':parent_ProductSize4,
                'quantity':product_quantity4,
                'colors':parent_ProductColors4,
                'price':{
                            'digitalPrice':digital_price4,
                            'handWrittenPrice':handwritten_price4,
                            'currency':currency_type4,
                                     'discount':{
                                                'discountType':discount_type4,
                                                'discountValue':discount_amount4
                                                }
                         }

             },
            
         ],
        'gltfPath':"ew",
        'seoPageTitle':seoPageTitle, 
        'seoPageDescription':seoPageDescription,
        'brands':brands
    
        
    })
    res.redirect('/admin/product/product-list');
}
exports.deleteProduct_GET = async(req,res)=>{
    let id=req.params.id;
    await Product.findByIdAndDelete(id)
    res.redirect('/admin/product/product-list');
}
exports.clientProduct_GET = async(req,res,next)=>{
    let {categoryName,id}=req.params;
    let imageURL = '/storage/products/'
    let product = await Product.findById(id);
    res.render('client-product',{'product':product,'imageURL':imageURL,'id':id.toString(),'categoryName':categoryName.toString()});
}
exports.submitReview_POST = async(req,res)=>{
    console.log("reached");
    res.send("boom boom boom");
}