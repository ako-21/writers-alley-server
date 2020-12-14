const express = require('express')
const router = express.Router()
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const Writing = require('../models/writing')

router.post('/checklists', requireToken, (req, res, next) => {
  console.log(req.body.checklist)
  const checklistData = req.body.checklist
  const writingId = checklistData.writingId
  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      writing.checklist = checklistData
      return writing.save()
    })
    .then(writing => res.status(201).json({writing: writing}))
    .catch(next)
})

router.patch('/checklists/:id', requireToken, removeBlanks, (req, res, next) => {
  // const checklistId = req.params.id
  const checklistData = req.body.checklist
  const writingId = checklistData.writingId
  // const checklistId = checklistData.checklistId

  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      requireOwnership(req, writing)
      writing.checklist.set(checklistData)
      return writing.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/checklists/:id', requireToken, (req, res, next) => {
  // console.log(req)
  // const checklistId = req.body.checklistId
  const writingId = req.body.writingId

  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      requireOwnership(req, writing)
      writing.checklist.remove()
      return writing.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
