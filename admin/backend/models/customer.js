const mongoose =require('mongoose');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv')

dotenv.config()
const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        dob:{
            type:Date
        },
    pincode:
    {
        type:Number,
    },
    phone:{
        type:String,
        length:10
    },
    tokens:[{
        token:{type:String,
        required:true}
    }]
},{ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});



userSchema.pre('save',async function(next){
    console.log(this)
    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
        console.log("changes")
    }
    console.log("done")
    next();
})
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({ _id:this._id},'qazwsxedcrfvtgby1234567890gvuhbijnok');
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token;
    }
    catch(err)
    {
        console.log(err)
    }

}

module.exports= mongoose.model("User",userSchema);