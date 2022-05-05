const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name:{
        type:String,
        maxLength:100,
        required:true
    },
    image:[{
        type:String
    }],
    description:{
        type:String,
        maxLength:1000,
        minLength:100,
        required:true
    },
    visibility:{
        visibility_type:{
            type:String,
        },
        publish_at:{
            type:Date,
            min: () => Date.now() + 7*24*60*60*1000,
        }
    },
    keywords:[{
        type:String,
    }],
    slug:
    {
        type:String,
        lowercase:true,
        required:true,
    },
    parentCategory:
    {
        type:String,
        default:'none',
        required: true
    },
    seoPageTitle:
    {
        type:String,
    },
    seoMetaDescription:
    {
        type:String,
    },
    hidden:{
        type:Number,
        default:1,
    }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})
module.exports = mongoose.model('category',categorySchema);


