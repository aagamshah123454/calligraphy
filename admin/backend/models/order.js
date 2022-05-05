const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const orderSchema = mongoose.Schema({
    o_userId:{
        type:String,
        required:true
    },
   o_cart_Id:
   {
        type:String,
        required:true
   },
    status:{
        type:String,
        default:"pending"
    },
    paymentStatus:{
        type:String,
        default:"Paid"
    },
    
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('Order',orderSchema);