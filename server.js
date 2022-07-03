require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const userRoutes = require('./routes/users.route')

const app = express()

app.use('/api/user', userRoutes)


mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(process.env.PORT, () => { 
            console.log(`Server is running on http://localhost:${process.env.PORT} and connected to mongoDB`) 
        })
    })
    .catch((error)=>{
        console.log(`error === > ${error}`)
    })

