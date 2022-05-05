let jwt = require('jsonwebtoken');
let Admin = require('../backend/models/admin')
let User = require('../backend/models/customer')




 const verifyToken = async(req,res,next)=>
{
  let token;
  console.log(req.headers.cookie)
    cookie={};
    if(req.headers.cookie==undefined || req.headers.cookie==null)
    {
      token=null;
    }
    else
    {
      req.headers.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
      })
      token = cookie['calligraphyideas']
    }
    if(token==undefined || token==null)
    {
      res.redirect("/admin/login"); 
    }
    else
    {
      jwt.verify(token,"qazwsxedcrfvtgby1234567890gvuhbijnok",async(err,user)=>{
        if(err) {console.log(err)};
        req.user = user
        let existinguser = await Admin.findById(user._id);
        if(existinguser!=null)
        {


          next()
        }
        else
        {          res.redirect("/admin/login");
        }
    })
    }
  
    
}
const verifyTokenU = async(req,res,next)=>
{
  let token;
  console.log(req.headers.cookie)
    cookie={};
    if(req.headers.cookie==undefined || req.headers.cookie==null)
    {
      token=null;
    }
    else
    {
      req.headers.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
      })
      token = cookie['calligraphyideas_u']
    }
    if(token==undefined || token==null)
    {
      console.log("not defined")
      res.redirect("/login"); 
    }
    else
    {
      jwt.verify(token,"qazwsxedcrfvtgby1234567890gvuhbijnok",async(err,user)=>{
        if(err) {console.log(err)};
        req.user = user
        let existinguser = await User.findById(user._id);
        if(existinguser!=null)
        {
          next()
        }
        else
        {   
          console.log("user not found")
          res.redirect("/login");
        }
    })
    }
  
    
}

module.exports = {verifyToken,verifyTokenU}
