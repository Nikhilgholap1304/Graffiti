const mongoose = require('mongoose');

const DesignerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  designsUploaded: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const Designer = mongoose.model('Designer', DesignerSchema);
module.exports = Designer;