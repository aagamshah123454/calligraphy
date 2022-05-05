
const express = require('express')//request for express from node modules
let UserController = require('./../backend/controllers/userController')
const {verifyToken,verifyTokenU} = require('../middleware/verifytoken')




const userRouter = express.Router();


userRouter.get('/login', UserController.Login_GET);
userRouter.post('/login', UserController.Login_POST);
userRouter.get('/admin/login', UserController.Login_GET);
userRouter.post('/admin/login', UserController.Login_POST);

userRouter.get('/signup', UserController.Signup_GET);
userRouter.post('/signup', UserController.Signup_POST);
userRouter.get('/admin/signup', UserController.Signup_GET);
userRouter.post('/admin/signup', UserController.Signup_POST);

userRouter.get('/forgetpassword',UserController.User_Forget_password_GET);
userRouter.post('/forgetpassword', UserController.User_Forget_password_POST);

userRouter.get('/reset-password/:id/:token', UserController.User_Create_new_password_GET);
userRouter.post('/reset-password/:id/:token', UserController.User_Create_new_password_POST);

userRouter.get('/accounts/:id/profile', UserController.Client_Manage_profile_GET);
userRouter.post('/accounts/:id/profile', UserController.Client_Manage_profile_POST);




module.exports = userRouter;