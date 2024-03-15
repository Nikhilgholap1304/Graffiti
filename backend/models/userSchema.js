const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rname: {
    type: String,
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  cpassword: {
    type: String,
    required: true
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  sessionToken: [{
    type: String
  }],
  profilePic: {
    type: String,
  },
  hasDesignerBadge: {
    type: Boolean,
    default: false // Default value is false, indicating the user does not have a designer badge by default
  },
  status: {
    type: String,
  }
})

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcryptjs.hash(this.password, 12)
    this.cpassword = await bcryptjs.hash(this.cpassword, 12)
  }
  next()
})

const User = mongoose.model('USER', userSchema)

module.exports = User