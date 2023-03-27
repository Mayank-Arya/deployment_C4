const express = require('express')
const {connection} = require("./db")
require('dotenv').config()
const {userRouter} = require('./routers/user.routes')
const {postRouter} = require('./routers/post.routes')
const { auth } = require('./middlewares/auth.middleware')
const cors = require('cors')
const app = express()
app.use(express.json())

app.use(cors())
app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/users",userRouter)
app.use(auth)
app.use('/posts',postRouter)

app.listen(process.env.port, async(req,res)=>{
    await connection
    console.log(`Server is running at ${process.env.port}`)
})