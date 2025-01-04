const specials = require('../model/specialModel');
const mongo = require('mongoose');

const getItembyId = (canteen_id) => {
    return new Promise((resolve, reject) => {
        specials.find({ canteen_id: canteen_id }).then((data) => {
            return resolve({ status: 200, data });
        }).catch((err) => {
            return reject(err);
        })
    });
};


const addSpecial = (canteen_id, name, price, image, description) => {
    return new Promise((resolve, reject) => {
        specials.create({
            canteen_id: canteen_id,
            name: name,
            price: price,
            image: image,
            description: description
        }).then(() => {
            return resolve({ status: 201 });
        }).catch((err) => {
            return reject(err);
        });
    });

};


const updateSpecialAvailable = (_id) => {
    return new Promise((Resolve,Reject)=>{
    specials.findOne({_id:_id}).then((data)=>{
        specials.updateOne({_id:_id},{available:!data.available}).then((data)=>{
            return Resolve({status:200,data});
        }).catch((err)=>{
            return Reject(err);
        })
    })
    .catch((err)=>{
        return Reject(err);
    }
)


}
    )};





module.exports ={
    getItembyId,
    addSpecial,
    updateSpecialAvailable
};