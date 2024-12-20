const menus = require('../model/menuModel');
const mongo = require('mongoose');


const getmenu = (canteen_id)=>{
    return new Promise((resolve,reject)=>{
        const objectId = new mongo.Types.ObjectId(canteen_id);
        console.log(objectId);
        menus.find({canteen_id:objectId}).then((data)=>{
            return resolve({status:200,data});
        }).catch((err)=>{
            return reject(err);
        })
    });
};


module.exports={
    getmenu
};