const mongoose = require('mongoose')
require('dotenv').config();

// MongoDB connection string
const mongoDB_URI = `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.aaua1c8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const connectToMongo = async () => {
    await mongoose.connect(mongoDB_URI, {
        serverSelectionTimeoutMS: 15000,  // Increase timeout to handle slow networks
        socketTimeoutMS: 20000,           // Optional: how long Mongoose waits for a response
        ssl: true,                        // Ensure secure connection (especially for Atlas)
    }).then(() => {
        console.log("Connection is successfull :)");
    }).catch((e) => {
        console.log("NOT Connected :( " + e);
    });
} 

module.exports = connectToMongo;