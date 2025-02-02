const mongoose = require('mongoose');

const raitings = new mongoose.Schema({
    user_id :{type:mongoose.Schema.Types.ObjectId, required:true},
    item_id :{type:mongoose.Schema.Types.ObjectId, required:true},
    raiting : {type:Number, required:true},
});

module.exports = mongoose.model.raitings || mongoose.model('raitings', raitings);