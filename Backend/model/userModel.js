const mongoose = require('mongoose');

const users = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dob: { type: Date, required: true }, 
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Student', 'Lecturer', 'Non Academic Staff'], required: true },
  faculty: { type: String, required: true },
  e_mail: { type: String, default: null, required: true},
  contact: { type: String, default: null },
  gender: { type: String, default: null, required: true },
  depernment: { type: String, default: null },
  FCMToken : {type: String, default: ""},
  verified: { type: Boolean, default: false },
  verificationToken: { type: String, default: null },
  verificationAt: { type: Date, default: null },
});

module.exports = mongoose.model.users||mongoose.model('users', users);
