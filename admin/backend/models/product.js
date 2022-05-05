const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    tags:[{
        type:String,
    }],
    description: {
        type: String,
    },
    features:[{
        type: String,
    }],
    productType:[{
        type:String,
    }],

    image:[{
        imagePath:{
            type: String,
        },
        altText:{
            type: String,
        }
    }],
    categoryName: [{
        type: String,
    }],
    SKU:{
        SKUName:
        {
            type:String,
        },
        basePrice: {
            type:Number,
        }, 

    },
  
    slug: {
        type: String,
  
    },
    options:[{

        material:[{
            type:String,
        }],
        size:[{
            type: String,
        }],
        quantity: {
            type: Number
        },
        colors:[{
            type: String,
           
        }],
        price: {
            digitalPrice: {
                type:Number,
         
            },
            handWrittenPrice: {
                type:Number,
          
            },
            currency:{
                type:String,
              
                default: "INR"
            },
            discount: {
                discountType:{
                    type:String,
                    default: "percentage"
                },
                discountValue: {
                    type:Number,
                    default:0
                }   
    
            }
        },
      
    }],
    brands:[{
        type:String,
        required:true
    }],
    gltfPath: {
        type: String,
    },
    seoPageTitle: {
        type: String,
        // required:true,
    },
    seoPageDescription: {
        type: String,
        // required:true,
    },

},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

 module.exports = mongoose.model('Product', productSchema);

