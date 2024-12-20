const mongoose = require('mongoose');

const canteens = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    username:{type:String, required:true},
    password:{type:String, required:true},
    opon:{type:Boolean, required:true, default:true},
})

module.exports = mongoose.model.canteens ||mongoose.model('canteens', canteens);
