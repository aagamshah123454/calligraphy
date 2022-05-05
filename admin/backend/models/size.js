const mongoose = require('mongoose')
const Schema  =mongoose.Schema
const sizeSchema = new mongoose.Schema({
   
   size:
   {
        type:String,
        required:true,
   },
   hidden:
   {
        type:Number,
        default:1
   }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('size',sizeSchema);