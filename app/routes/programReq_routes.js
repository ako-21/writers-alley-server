const express = require('express')
const router = express.Router()
const passport = require('passport')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })
const Writing = require('../models/writing')

router.post('/programReqs', requireToken, (req, res, next) => {
  const programReqData = req.body.programReq
  const writingId = req.body.writingId
  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      writing.checklist.programReq.push(programReqData)
      return writing.save()
    })
    .then(writing => res.status(201).json({writing: writing}))
    .catch(next)
})

router.patch('/programReqs/:id', requireToken, removeBlanks, (req, res, next) => {
  const programReqId = req.body.programReq.id
  const programReqData = req.body.programReq
  const writingId = req.body.programReq.writingId

  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      requireOwnership(req, writing)
      writing.checklist.programReq.id(programReqId).set(programReqData)
      return writing.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.delete('/programReqs/:id', requireToken, (req, res, next) => {
  // console.log(req)
  const programReqId = req.params.id
  const writingId = req.body.writingId

  Writing.findById(writingId)
    .then(handle404)
    .then(writing => {
      requireOwnership(req, writing)
      writing.checklist.programReq.id(programReqId).remove()
      return writing.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
