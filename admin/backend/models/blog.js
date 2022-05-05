const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
        maxLength:50,
    },
    subTitle:{
        type:String,
        required:true,
        maxLength:50,
    },
    content:{
        type:String,
        required:true,
        minlength:300,
    },
    author:{
        name:{
        type:String,
        required:true,
        },
        authorDescription:{
            type:String,
            minLength:30,
            maxLength:100,
        },
        author_profile_photo:
        {
            type:String,
        }, author_profile_photo_alt:
        {
            type:String,
        }

    },
 
    visibility:{
        visibility_type:{
            type:String,
            required:true,
            default:"published",
        },
        publish_at:
        {
            type:Date,
            min: () => Date.now() + 7*24*60*60*1000,
        }
    },
    slug:{type:String},
    category:{
        type:String,
    },
    keywords:[{
        type:String,
    }],
    image:[{}],
    seoPageTitle:{type:String},
    seoPageDescription:{type:String},
    hidden:
    {
        type:Number,
        default:1
    }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

module.exports=mongoose.model('Blog',blogSchema)

// b_title
// b_subTitle
// b_content
// b_author
// b_authorDescription
// b_visibility