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


module.exports ={
    getItembyId
};