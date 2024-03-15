const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  sessionToken: [{
    type: String
  }],
  profilePic: {
    type: String,
  },
})

const Admin = mongoose.model('Admin', AdminSchema)

module.exports = Admin