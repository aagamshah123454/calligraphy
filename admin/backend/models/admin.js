const mongoose = require('mongoose');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
const dotenv = require('dotenv')



const adminSchema = new Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    profileImagePath:
    {
        type:String,
        default:'/images/no-img.png'
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    streetAddress:{
            type:String,
            required:true
        },
    country:{
        type:String,
        required:true
        },
    state:{
            type:String,
            required:true
        },
    district:{
            type:String,
            required:true
        },
    city:{
            type:String,
            required:true
        },
    pincode:
    {
        type:Number,
    },
    phone:{
        type:String,
        length:10
    },
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
})


adminSchema.pre('save',async function(next){
    console.log(this.password)
    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
        console.log("changes")
    }
    console.log("done")
    next();
})

adminSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({ _id:this._id},'qazwsxedcrfvtgby1234567890gvuhbijnok');
        // this.tokens=this.tokens.concat({token:token})
        // await this.save()
        return token;
    }
    catch(err)
    {
        console.log(err)
    }

}
module.exports=mongoose.model('Admin',adminSchema)
