const express = require('express');
const mongoose = require('mongoose');

const Admin = require('../backend/models/admin');
const Blog = require('../backend/models/blog')
const Faq = require('../backend/models/faq')
const User = require('../backend/models/customer');
const Category = require('../backend/models/category');
const Brand = require('../backend/models/brand');
const Product = require('../backend/models/product');
const Image = require('../backend/models/image');
const Cart = require('../backend/models/cart');
const Order = require('../backend/models/order');
const Review = require('../backend/models/review');


const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})



const BlogData=[
	{
        b_title:"blog1_title",
        b_subTitle:"blog1_subtitle",
        b_content:"blog1_content",
        b_author:"blog1_author",
        b_authorDescription:"blog1_author_description",
        b_visibility:"Published"
	},
	{
        b_title:"blog2_title",
        b_subTitle:"blog2_subtitle",
        b_content:"blog2_content",
        b_author:"blog2_author",
        b_authorDescription:"blog2_author_description",
        b_visibility:"Published"
	},
	{
        b_title:"blog3_title",
        b_subTitle:"blog3_subtitle",
        b_content:"blog3_content",
        b_author:"blog3_author",
        b_authorDescription:"blog3_author_description",
        b_visibility:"Published"
	},
]

const brandData=[
    {
        br_name:'Calligraphyideas',
        br_logo:'calligraphyideas.png',
        br_description:'we are the creators',
        br_visibility:'Published',
        br_publishDate:"",
        br_slug:'calligraphyideas'
    },
]

const adminData = [
    {
        a_name:'Aagam',
        a_email:'Aagamshah25121@gmail.com',
        a_contact:8238111713,
        a_password:'Drunken_master@aagam',
        a_streetAddress:'E/8 chandragupta apt behind sahajandand college',
        a_city:'Ahmedabad',
        a_country:'India',
    }   
]


const productData=[
    {
        title:'we are men',
        description:'new manly frame for males',
        image:'we-are-men-frame.png',
        categoryName:'Frames',
        price:300,
        isEnable:1,
        quantity:34,
        slug:'we-are-men',
        gltfPath:"",

        seoPageTitle:'weAreMenSeoTitle',
        seoPageDescription:'we are men seoPageDescription'
    },
    {
        title:'men in black',
        description:'men in black frames',
        image:'men-in-black.png',
        categoryName:'Black-frame',
        price:350,
        isEnable:1,
        quantity:90,
        slug:'men-in-black',
        gltfPath:"",

        seoPageTitle:'men in black SeoTitle',
        seoPageDescription:'men in black seoPageDescription'
    }
]
const productAttributeData=[
    {
        pra_product_id:"6219d3e5999b23d38f9a2ee0",
        pra_colorId:"6219d642b0384a4965a03776",
        pra_sizeId:"6219d642b0384a4965a0377b",    
    },
    {
        pra_product_id:"6219d3e5999b23d38f9a2ee0",
        pra_colorId:"6219d642b0384a4965a03777",
        pra_sizeId:"6219d642b0384a4965a0377b",    
    },
    {
        pra_product_id:"6219d3e5999b23d38f9a2ee0",
        pra_colorId:"6219d642b0384a4965a03778",
        pra_sizeId:"6219d642b0384a4965a0377b",    
    },
    {
        pra_product_id:"6219d3e5999b23d38f9a2ee1",
        pra_colorId:"6219d642b0384a4965a03779",
        pra_sizeId:"6219d642b0384a4965a0377b",    
    },
    {
        pra_product_id:"6219d3e5999b23d38f9a2ee1",
        pra_colorId:"6219d642b0384a4965a03779",
        pra_sizeId:"6219d642b0384a4965a0377c",    
    },
    {
        pra_product_id:"6219d3e5999b23d38f9a2ee1",
        pra_colorId:"6219d642b0384a4965a0377a",
        pra_sizeId:"6219d642b0384a4965a0377d",    
    },
    {
        pra_product_id:"6219d3e5999b23d38f9a2ee1",
        pra_colorId:"6219d642b0384a4965a0377a",
        pra_sizeId:"6219d642b0384a4965a0377d",    
    },
 
    
]

const ReviewData = [
    {
        productId:'6219e13e414f09610b9f426e',
        review:'review one for we are men frame',
        rating:3,
        userId:"6219e13e414f09610b9f427a",
    },
    {
        productId:'6219e13e414f09610b9f426e',
        review:'review two for we are men frame',
        rating:4,
        userId:"6219e13e414f09610b9f427b",
    },
    {
        productId:'6219e13e414f09610b9f426f"',
        review:'review two for men in black frame',
        rating:5,
        userId:"6219e13e414f09610b9f427c",
    }
]
const CartData = [
    {
        ca_userId:"6219e36edf97f4e2ba780324",
        ca_productId:"6219e36edf97f4e2ba780318",
        ca_productAttributeId:"324jnk322j42324",
        ca_finalAmount:0,
    }
]





const seedDB = async()=>{
    await Admin.deleteMany(); 
    await Blog.deleteMany();
    await Brand.deleteMany();
    await Cart.deleteMany();
    await User.deleteMany();
    await Image.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    await Review.deleteMany();

    // colorData.forEach(async(data)=>{
    //     const color = new Color(data);
    //     await color.save();
    // })
    // sizeData.forEach(async(data)=>{
    //     const size = new Size(data);
    //     await size.save();
    // })



    // adminData.forEach(async(data)=>{
    //     const admin = new Admin(data);
    //     await admin.save();
    // }) DONE





    // brandData.forEach(async(data)=>{
    //     const brand = new Brand(data);
    //     await brand.save();
    // })
    // productData.forEach(async(data)=>{
    //     let product  = new Product(data);
    //     await product.save();
    // })
    // BlogData.forEach(async(data)=>{
    //     let blog = new Blog(data);
    //     await blog.save();
    // })
    // UserData.forEach(async(data)=>{
    //     let user = new User(data);
    //     await user.save();
    // })
    // ReviewData.forEach(async(data)=>{
    //     let review = new Review(data);
    //     await review.save();
    // })
   
    

 
    console.log("all data fetched")
    
}
seedDB();