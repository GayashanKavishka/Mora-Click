const mongo = require('mongoose');
const moment = require('moment-timezone');
const reviews = require('../model/reviewModel');

const addReview = (obj) => {
    return new Promise((resolve, reject) => {
        const { canteenId, userId, review } = obj;
        console.log('canteenId:', canteenId);
        console.log('userId:', userId);
        console.log('review:', review);
        const newReview = new reviews({
            _id: new mongo.Types.ObjectId(),
            canteenId,
            userId,
            review
        });

        newReview.save().then((data) => {
            console.log('Review added successfully:', data);
            return resolve({ status: 200, data });
        }).catch((err) => {
            return reject(err);
        });
    });
}

module.exports = {
    addReview
};