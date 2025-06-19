const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection string
const username = encodeURIComponent(process.env.MONGODB_USERNAME);
const password = encodeURIComponent(process.env.MONGODB_PASSWORD);

const mongoDB_URI = `mongodb+srv://${username}:${password}@cluster0.aaua1c8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const connectToMongo = async () => {
  await mongoose
    .connect(mongoDB_URI, {})
    .then(() => {
      console.log("Connection is successfull :)");
    })
    .catch((e) => {
      console.log("NOT Connected :( " + e);
    });
};

module.exports = connectToMongo;
