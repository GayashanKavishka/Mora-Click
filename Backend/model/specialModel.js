const mongose = require('mongoose');

const specials = new mongose.Schema({
    canteen_id : {type:String, required:true},
    name : {type:String, required:true},
    price : {type:Number, required:true},
    available : {type:Boolean, default:false,default : false},  
    discription:{type:String},
    image : {type:String ,default:"null"},
    raiting : {type:Number, default:0},

});


module.exports = mongose.model.specials||mongose.model('specials', specials);