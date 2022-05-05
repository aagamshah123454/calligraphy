const mongoose =require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    productId:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        default:5
    },
    userId:{
        type:String,
        required:true
    }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

module.exports=mongoose.model('Review',reviewSchema)

// Review
// id, productId, review, rating, userId , timestamp , isActive