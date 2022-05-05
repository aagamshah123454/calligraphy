const express = require('express');
const mongoose = require('mongoose');

const Product = require('../backend/models/product');



const app = express();


mongoose.connect('mongodb://localhost:27017/calligraphyideas',
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db=mongoose.connection;
db.on('error',console.error.bind('connection error'));
db.once('open',()=>{console.log("Database connected")})







const productData=[
    {
        title:"Men in black frame",
        description:"this frame is made from the synthetic wooden and you can pu it in the water also",
        features:["easy to hang","easy to hold"],
        productType:["DigitalPrint","handwrittenPrint"],
        image:[{
            imagePath:"men-in-black-6x6.png",
            altText:"men-in-black-6x6"
        },
        {
            imagePath:"men-in-black-5x5.png",
            altText:"men-in-black-5x5"
        },{
            imagePath:"men-in-black-6x6(2).png",
            altText:"men-in-black-6x6(2)"
        },
        {
            imagePath:"men-in-black-5x5(2).png",
            altText:"men-in-black-5x5(2)"
        }
        ],
        tags:["men","black","frames","5x5","8x8"],
        categoryName:["Frames"],
        SKU:{
            SKUName:"mb100",
            basePrice:60,
            currency:"INR",
        },
        slug: "mb-100FR",
        options:[{
    
            size:'5x5',
            material:['syntheticwooden'],
            quantity:35,
            material:['syntheticwooden','wooden'],
            colors:['black'],
            price: {
                digitalPrice:100,
                handWrittenPrice:150,
                currency:"INR",
                discount: {
                    discountType:'percentage',
                    discountValue:0,
                }
            },
        },
        {
            size:'6x6',
            material:['syntheticwooden','wooden'],
            quantity:30,
            colors:['black','white','red'],
            price: {
                digitalPrice:150,
                handWrittenPrice:200,
                currency:"INR",
                discount: {
                    discountType:'percentage',
                    discountValue:0,
                }
            },
        },
        ],
        brands:['calligraphyideas'],
        gltfPath:'',
        seoPageTitle:'men-in-black frame',
        seoPageDescription:'men-in-black frames in different variants',
       
    }]
 





const seedDB = async()=>{

    await Product.deleteMany();


    
    productData.forEach(async(data)=>{
        let product  = new Product(data);
        await product.save();
    })
    

 
    console.log("all data fetched")
    
}
seedDB();