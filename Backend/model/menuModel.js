const mongoose = require('mongoose');

const menus = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},
    canteen_id:{type:mongoose.Schema.Types.ObjectId, required:true},
    date:{type:Date, required:true, default:Date.now},
    main:[{
        name:{type:String, required:true},
        price:{type:Number, required:true},
        available:{type:Boolean, required:true, default:true},
        time_be_ua:{type:String, required:true,default:null},
    }],
    short_eat:[{
        name:{type:String, required:true},
        price:{type:Number, required:true},
        available:{type:Boolean, required:true, default:true},
        time_be_ua:{type:String, required:true,default:null},
    }],
    beverag:[{
        name:{type:String, required:true},
        price:{type:Number, required:true},
        available:{type:Boolean, required:true, default:true},
        time_be_ua:{type:String, required:true,default:null},
    }]
})

module.exports = mongoose.model.menus||mongoose.model('menus', menus);