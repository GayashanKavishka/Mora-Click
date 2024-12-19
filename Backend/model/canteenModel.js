const mongoose = require('mongoose');

const canteens = new mongoose.Schema({
    name:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    opon:{type:Boolean, required:true, default:true},
})

module.exports = mongoose.model('canteens', canteens);
