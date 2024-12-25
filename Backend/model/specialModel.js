const mongose = require('mongoose');

const specials = new mongose.Schema({
    canteen_id : {type:String, required:true},
    name : {type:String, required:true},
    price : {type:Number, required:true},
    available : {type:Boolean, default:false,default : false},  
    description:{type:String},
    image : {type:String}

});


module.exports = mongose.model.specials||mongose.model('specials', specials);