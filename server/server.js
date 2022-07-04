require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/user.route');
const noteRouter = require('./routes/note.route');
const authRouter = require('./routes/auth.route');
const { authorize, checkUser } = require('./middleware/auth.middleware');

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use('/api/user', authorize, checkUser, userRouter);
app.use('/api/note', authorize, checkUser, noteRouter);
app.use('/api/auth', authRouter);

// connect to mongoDB and listen to requests
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to mongoDB and Server is running on http://localhost:${process.env.PORT}`);
        })
    })
    .catch((error) => {
        console.log(`error === > ${error}`);
    });

