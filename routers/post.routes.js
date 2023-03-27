const express = require('express')
const {postModel} = require("../models/post.model")

const postRouter = express.Router()

postRouter.get("/",async(req,res)=>{
    // const query = req.query
    try{
    const post = await postModel.find()
    res.status(200).send(post)
    }
    catch(err){
    res.status(400).send({'msg':'Please Login first'})
    }
})

postRouter.post("/add",async(req,res)=>{
    const payload = req.body
    try{
    const post = new postModel(payload)
    await post.save()
    res.status(200).send({'msg':'New Post Has Been Created'})
    }
    catch(err){
    res.status(400).send({'msg':'Please Login first'})
    }
})


// postRouter.get('/add', async (req, res) => {
//     try {
//         const userId = req.user._id;
//         const query = { userId }
        
//         const posts = await postModel.find(query);
    
//         res.status(200).send(posts);
//       }
//  catch (err) {
//       res.status(400).send({ msg: err.message });
//     }
// })

  
  // Show top posts of logged in user with pagination
  postRouter.get('/posts/top', async (req, res) => {
    try {
      const auth = req.headers.authorization;
      const token = auth
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).send({'msg':'Top Posts',decoded})
    }catch(err){

    }

  })
module.exports = {postRouter}

