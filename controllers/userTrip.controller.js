const UserTrip = require('../models/UserTrip')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const privateKey = process.env.PRIVATEKEY

module.exports = {
  findAll: (req, res) => {
    UserTrip.find()
      .populate('userId tripId')
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
      .populate('userId tripId')
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
    UserTrip.create({
      userId: req.body.userId,
      tripId: req.body.tripId,
    })
      .then(userTrip => {
        res.status(200).json({
          message: 'New userTrip added successfully',
          userTrip,
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR:: unable to add userTrip',
          err
        })
      })
  },
  deletion: (req, res) => {
    let { id } = req.query
    UserTrip.findByIdAndRemove(id)
      .populate('userId tripId')
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
      .populate('userId tripId')
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


  }

}