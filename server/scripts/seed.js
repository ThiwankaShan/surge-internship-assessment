const mongoose = require('mongoose');
const User = require('../models/user.model');
require('dotenv').config();

const data = {
    'id': 0,
    'email': 'admin@gmail.com',
    'password': 'admin123',
    'firstName': 'admin',
    'lastName': 'admin',
    'dateOfBirth': '1990-01-01',
    'mobile': 0,
    'accountType': 'admin',
    'status': true
}

seed = async ()=>{
    try{
        await User.create(data);
        console.log('✅ Admin account created successfully \n');
        process.exit();
    }catch(e){
        console.log('❌ Something went wrong (refer error below)');
        console.log(e);
        process.exit();
    }
    
}

mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("✅ Connected to MongoDB server \n");
        seed();
    })
    .catch((error) => {
        console.log(`error === > ${error}`);
    });
