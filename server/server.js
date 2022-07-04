require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/user.route');
const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/user', userRouter);

// connect to mongoDB and listen to requests
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        app.listen(process.env.PORT, () => { 
            console.log(`Connected to mongoDB and Server is running on http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error)=>{
        console.log(`error === > ${error}`);
    });

