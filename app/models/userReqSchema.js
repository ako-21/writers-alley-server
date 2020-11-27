const mongoose = require('mongoose')

const userReqSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    required: true
  },
  checklist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true
  }
}, {
  timestamps: true
})

module.exports = userReqSchema
