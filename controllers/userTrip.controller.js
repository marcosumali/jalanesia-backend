const UserTrip = require('../models/UserTrip')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const privateKey = process.env.PRIVATEKEY

module.exports = {
  findAll: (req, res) => {
    UserTrip.find()
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(userTrips => {
        res.status(200).json({
          message: 'All userTrips retrieved',
          userTrips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch UserTrips',
          err
        })
      })
  },
  findOne: (req, res) => {
    let { id } = req.query

    UserTrip.findById(id)
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(userTrip => {
        res.status(200).json({
          message: 'Single UserTrip retrieved',
          userTrip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch UserTrip by id',
          err
        })
      })
  },
  add: (req, res) => {
    let { _id }  = req.decoded // user Id
    let { tripId } = req.query // trip Id
    let { quantity } = req.body

    UserTrip.create({
      userId: _id,
      tripId,
      quantity: quantity || 1,
      status: "awaiting payment",
      sentiment: "",
      score: 0,
      review: "",
    })
      .then(userTrip => {
        res.status(200).json({
          message: 'New userTrip added successfully',
          userTrip,
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to add userTrip',
          err
        })
      })
  },
  deletion: (req, res) => {
    let { id } = req.query

    UserTrip.findByIdAndRemove(id)
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(userTrip => {
        res.status(200).json({
          message: 'userTrip deleted successfully',
          userTrip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete userTrip',
          err
        })
      })
  },
  findByUser: (req, res) => {
    let { _id }  = req.decoded

    UserTrip.find({ userId: _id })
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(userTrips => {
        res.status(200).json({
          message: 'Get userTrips by userId successful',
          userTrips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find userTrip by userId',
          err
        })
      })
  },
  updateStatus: (req, res) => {
    let { id } = req.query
    let { status } = req.body

    UserTrip.findByIdAndUpdate(id, {
      status
    })
      .then(updatedUserTrip => {
        res.status(200).json({
          message: 'Update status userTrips successful',
          updatedUserTrip
        })

      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to update userTrip status',
          err
        })
      })
  },
  updateSentiment: (req, res) => {
    let { id } = req.query
    let { sentiment } = req.body

    UserTrip.findByIdAndUpdate(id, {
      sentiment
    })
      .then(updatedUserTrip => {
        res.status(200).json({
          message: 'Update sentiment userTrips successful',
          updatedUserTrip
        })

      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to update userTrip sentiment',
          err
        })
      })
  },
  updateReview: (req, res) => {
    let { id } = req.query
    let { score, review } = req.body

    if (score > 0 && review.length > 5) {
      UserTrip.findByIdAndUpdate(id, {
        score,
        review
      })
        .then(updatedUserTrip => {
          res.status(200).json({
            message: 'Update review & score userTrips successful',
            updatedUserTrip
          })
  
        })
        .catch(err => {
          res.status(400).json({
            message: 'ERROR: unable to update userTrip review & score',
            err
          })
        })  
    } else {
      res.status(400).json({
        message: 'ERROR: score & review value are not adequate',
        err
      })
    }
  }

}