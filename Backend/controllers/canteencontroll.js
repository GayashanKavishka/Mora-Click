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


const getAllCanteens = () => {
    return new Promise((resolve, reject) => {
        canteens.find({}, {name:1,_id:1}).then((data) => {
            return resolve({status: 200, data});
        }).catch((err) => {
            return reject(err);
        });
    });
};



const updatecanteen =(canteen)=>
{
    return new Promise((resolve,reject)=>{
        canteens.updateOne({_id:canteen._id},canteen).then((data)=>{
            return resolve({status:200,data});
        }).catch((err)=>{
            return reject(err);
        })
    });
};



const updateCanteenStatus = (_id) => {
    return new Promise((resolve, reject) => {
        const objectId = new mongo.Types.ObjectId(_id);
        canteens.updateOne({_id: objectId}, {open: true}).then((data) => {
            if (data.nModified > 0) {
                return resolve({status: 200, message: 'Canteen status updated to open'});
            } else {
                return reject({status: 404, message: 'Canteen not found'});
            }
        }).catch((err) => {
            return reject(err);
        });
    });
};




module.exports={
    getcanteen,
    updatecanteen,
    updateCanteenStatus,
    getAllCanteens
};