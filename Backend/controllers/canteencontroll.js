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



const updateCanteenStatus = async (_id, newStatus) => {
    try {
        if (!mongo.Types.ObjectId.isValid(_id)) {
            return { status: 400, message: 'Invalid Canteen ID' };
        }
        
        const objectId = new mongo.Types.ObjectId(_id); // ✅ Convert ID properly
        const result = await canteens.updateOne({ _id: objectId }, { $set: { open: newStatus } });
        
        
        if (result.modifiedCount >= 0) {
            return { status: 200, message: 'Canteen status updated successfully' };
        } else {
            return { status: 404, message: 'Canteen not found' };
        }
    } catch (error) {
        console.error('Database Error:', error);
        return { status: 500, message: 'Database error', error };
    }
};






module.exports={
    getcanteen,
    updatecanteen,
    updateCanteenStatus,
    getAllCanteens
};