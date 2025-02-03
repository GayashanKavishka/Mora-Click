
const mongoose = require('mongoose');

const reviews = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    canteenId: { type: mongoose.Schema.Types.ObjectId, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    review: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model.reviews || mongoose.model('reviews', reviews);