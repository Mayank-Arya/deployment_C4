const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.headers.authorization
    if(token){
     jwt.verify(token,'masai',(err,decoded)=>{
        if(decoded){
            req.body.user = decoded.userID
            next()
        }
     })
    }else{
res.send({'msg':"Please Login first"})
    }
}

module.exports = {auth}