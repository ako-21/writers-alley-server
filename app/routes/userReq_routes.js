const express = require('express')
const router = express.Router()
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const Writing = require('../models/writing')

router.post('/userReqs', requireToken, (req, res, next) => {
  const userReqData = req.body.userReq
  const writingId = userReqData.writingId
  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      writing.checklist.userReq.push(userReqData)
      return writing.save()
    })
    .then(writing => res.status(201).json({writing: writing}))
    .catch(next)
})

router.patch('/userReqs/:id', requireToken, removeBlanks, (req, res, next) => {
  const userReqId = req.body.userReq.id
  const userReqData = req.body.userReq
  const writingId = req.body.userReq.writingId

  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      requireOwnership(req, writing)
      writing.checklist.userReq.id(userReqId).set(userReqData)
      return writing.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/userReqs/:id', requireToken, (req, res, next) => {
  const userReqId = req.params.id
  const writingId = req.body.writingId

  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      requireOwnership(req, writing)
      writing.checklist.userReq.id(userReqId).remove()
      return writing.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
