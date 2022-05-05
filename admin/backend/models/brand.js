const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    br_name:{
        type:String,
        required:true
    },
    br_logo:{
        type:String,
        required:true
    },
    br_description:{
        type:String,
        required:true
    },
    br_visibility:{
        type:String,
        default:true
    },
    br_slug:
    {
        type:String,
        default:'https://example.com/catalog'
    },
    hidden:{
        type:Number,
        default:1
    }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

module.exports=mongoose.model('Brand',brandSchema)

// br_name
// br_logo
// br_description
// br_visibility
// br_publishDate
// br_slug