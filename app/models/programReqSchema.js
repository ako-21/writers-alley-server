const mongoose = require('mongoose')

const programReqSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
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

module.exports = programReqSchema
