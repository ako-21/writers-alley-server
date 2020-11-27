const userReqSchema = require('./userReqSchema.js')
const programReqSchema = require('./programReqSchema.js')
const mongoose = require('mongoose')
const checklistSchema = new mongoose.Schema({
  // dueDate: {
  //   type: String,
  //   required: true
  // },
  // numberOfPages: {
  //   type: Number
  // },
  // topics: {
  //   type: String
  // },
  // numberOfSources: {
  //   type: Number
  // },
  // typesOfSources: {
  //   type: String
  // },
  // questionsToAddress: {
  //   type: String
  // },
  // termstoInclude: {
  //   type: String
  // },
  // timePeriods: {
  //   type: String
  // },
  // people: {
  //   type: String
  // },
  // issues: {
  //   type: String
  // },
  // toAvoid: {
  //   type: String
  // },
  isComplete: {
    type: Boolean,
    required: true
  },
  isStarted: {
    type: Boolean,
    required: true
  },
  userReq: [userReqSchema],
  programReq: [programReqSchema]
}, {
  timestamps: true
})

module.exports = checklistSchema
