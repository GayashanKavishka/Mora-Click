const mongo = require('mongoose');
const moment = require('moment-timezone');
const reviews = require('../model/reviewModel');
const users = require('../model/userModel');

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

const getReview = (canteenId) => {
    return new Promise((resolve, reject) => {
        reviews.find({ canteenId: canteenId })
            .populate('userId', 'username') // Populate userId and get only the username field
            .then((data) => {
                return resolve({ status: 200, data });
            })
            .catch((err) => {
                return reject(err);
            });
    });
}

module.exports = {
    addReview,
    getReview
};