const mongoose = require('mongoose')
const Schema  =mongoose.Schema
const colorSchema = new mongoose.Schema({

   color_name:
   {
       type:String,
       required:true,
   },
   color_code:
   {
       type:String,
       required:true
   },
   hidden:
   {
        type:Number,
        default:1
   }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

module.exports = mongoose.model('color',colorSchema);