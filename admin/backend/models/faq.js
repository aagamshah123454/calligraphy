const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String
    },
    hidden:{
        type:Number,
        default:1
    }
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }})

module.exports = mongoose.model('Faq',faqSchema);

// FAQ
// id, question, answer, isActive
// question
// answer
// faq_visibility