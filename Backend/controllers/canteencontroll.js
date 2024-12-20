const canteens = require('../model/canteenModel');
const mongo = require('mongoose');

const getcanteen = (_id)=>{
    return new Promise((resolve,reject)=>{
        const objectId = new mongo.Types.ObjectId(_id);
        console.log(objectId);
        canteens.find({_id:objectId}).then((data)=>{
            return resolve({status:200,data});
        }).catch((err)=>{
            return reject(err);
        })
    });
};

module.exports={
    getcanteen
};