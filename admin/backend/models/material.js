const mongoose = require('mongoose')
const Schema  =mongoose.Schema
const materialSchema = new mongoose.Schema({

   materialName:
   {
       type:String,
       required:true,
   },
   materialInformation:
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

module.exports = mongoose.model('material',materialSchema);