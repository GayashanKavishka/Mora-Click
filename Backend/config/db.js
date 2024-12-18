const mongoose = require('mongoose');
require('dotenv').config();



const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const url = `mongodb+srv://${username}:${password}@cluster0.qucvz.mongodb.net/Mora_Click?retryWrites=true&w=majority&appName=Cluster0`;


// Corrected connection string
// const db = mongoose.connect('mongodb+srv://gayashankavishka2:Gaya@12345@cluster0.qucvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connect(
    // 'mongodb+srv://gayashankavishka2:Gaya12345@cluster0.qucvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
    url

).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = db;
