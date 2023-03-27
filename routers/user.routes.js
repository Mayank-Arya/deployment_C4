const express = require('express')
const { userModel } = require('../models/user.model')
const userRouter = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city,is_married} = req.body
    try{
      bcrypt.hash(password,4,async(err,hash)=>{
        if(err){
            res.status(400).send({'msg':err.message})
        }else{
            const user = new userModel({name,email,gender,password:hash,age,city,is_married})
            await user.save()
            res.status(200).send({'msg':'New User Has Been Registered'})
        }
      })
    }
    catch(err){
     res.status(400).send({'msg':err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try{
    const user = await userModel.find({email})
    if(user.length>0){
        bcrypt.compare(password,user[0].password,(err,result)=>{
            if(result){
                let token = jwt.sign({userID:user[0]._id},'masai')
                res.status(200).send({'msg':'Logged in','token':token})
            }else{
                res.status(400).send({'msg':"Wrong Credentials"})
            }
        })
    }else{
        res.status(400).send({'msg':"Wrong Credentials"})
    }
    }
    catch(err){
    res.status(400).send({"msg":"Wrong Credentials"})
    }
})


module.exports = {userRouter}