const checklistSchema = require('./checklist.js')
const mongoose = require('mongoose')

const writingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  phase: {
    type: String
  },
  isComplete: {
    type: Boolean,
    required: true
  },
  checklist: checklistSchema,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Writing', writingSchema)
