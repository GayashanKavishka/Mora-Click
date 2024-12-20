const mongoose = require('mongoose');

const users = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true },
  index: { type: String, default: null }, // Optional for non-students
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'lecturer', 'officer'], required: true },
  faculty: { type: String, required: true },
  batch: { type: String, default: null }, // Optional for non-students
});

module.exports = mongoose.model.users||mongoose.model('users', users);
