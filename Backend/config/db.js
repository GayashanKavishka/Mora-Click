const mongoose = require('mongoose');

// Corrected connection string
// const db = mongoose.connect('mongodb+srv://gayashankavishka2:Gaya@12345@cluster0.qucvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
const db = mongoose.connect(
    'mongodb+srv://gayashankavishka2:Gaya12345@cluster0.qucvz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
);

db.then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

module.exports = db;
