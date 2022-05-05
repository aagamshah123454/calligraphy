const mongoose = require('mongoose')
const Schema  =mongoose.Schema
const cartSchema = new mongoose.Schema({
    ca_userId:{
        type:String,
        required:true,

    },
    ca_product:[{

        ca_product_id:{
            type:String,
            required:true,
        },
        ca_product_color_id:{
            type:String,
            required:true,
        },
        ca_product_size_id:{
            type:String,
            required:true,
        },
        ca_product_quantity:{
            type:Number,
            required:true,
            default:1
        },
        ca_product_material_id:{
            type:String,
            required:true,
        }

    }],
    ca_finalAmount:
    {
        type:Number,
        required:true,   
    },
    

},{timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('Cart',cartSchema);