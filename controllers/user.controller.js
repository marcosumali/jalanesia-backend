const User = require('../models/User')
const jwt = require('jsonwebtoken')

module.exports = {
  findAll: (req, res) => {
    User.find()
      .exec()
      .then(users => {
        res.status(200).json({
          message: 'all users retrieved',
          users
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to fetch users',
          err
        })
      })
  },
  findOne: (req, res) => {
    User.findById(req.params.id)
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'user profile retrieved',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to fetch user profile',
          err
        })
      })
  },
  add: (req, res) => {
    User.create({
      // input field here
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dob: req.body.dob,
      email: req.body.email,
      gender: req.body.gender,
      phone: req.body.phone,
      password: req.body.password,
    })
      .then(user => {
        res.status(200).json({
          message: 'new user added',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to add user',
          err
        })
      })
  },
  deletion: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'user deleted',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to delete user',
          err
        })
      })
  },

}