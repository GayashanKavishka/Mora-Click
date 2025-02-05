const mongoose = require('mongoose');

const menus = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    canteen_id:{type:mongoose.Schema.Types.ObjectId, required:true},
    date:{type:Date, required:true, default:Date.now},
    main:[{
        name:{type:String, required:true},
        price:{type:Number, required:true},
        available:{type:Boolean , default:false},
        time_be_ua:{type:String , default:null},
        image : {type:String},
        raiting:{type:Number, default:0}
    }],
    short_eat:[{
        name:{type:String, required:true},
        price:{type:Number, required:true},
        available:{type:Boolean,  default:false},
        time_be_ua:{type:String, default:null},
        image : {type:String},
        raiting:{type:Number, default:0}
    }],
    beverage:[{
        name:{type:String, required:true},
        price:{type:Number, required:true},
        available:{type:Boolean,  default:false},
        time_be_ua:{type:String,  default:null},
        image : {type:String},
        raiting:{type:Number, default:0}
    }]
})

module.exports = mongoose.model.menus||mongoose.model('menus', menus);