const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const privateKey = process.env.PRIVATEKEY

module.exports = {
  findAll: (req, res) => {
    User.find()
      .exec()
      .then(users => {
        res.status(200).json({
          message: 'All users retrieved',
          users
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch users',
          err
        })
      })
  },
  findOne: (req, res) => {
    User.findById(req.params.id)
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'User profile retrieved',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch user profile',
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
      gender: req.body.gender,
      phone: req.body.phone || '',
      email: req.body.email,
      password: req.body.password,
    })
      .then(user => {
        let userJwt = { _id: user._id ,firstName: user.firstName, lastName: user.lastName, email: user.email }
        let token = jwt.sign(userJwt, privateKey)    
        res.status(200).json({
          message: 'New user added',
          user,
          token
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR:: unable to add user',
          err
        })
      })
  },
  deletion: (req, res) => {
    User.findByIdAndRemove(req.params.id)
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'User deleted',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete user',
          err
        })
      })
  },
  signIn: (req, res) => {
    let { email, password } = req.body
    User.findOne({ email })
      .exec()
      .then(user => {
        let checkHash = bcrypt.compareSync(password, user.password); // true or false
        if (checkHash == true) {
          let userJwt = { _id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email }
          let token = jwt.sign(userJwt, privateKey)
          res.status(200).json({
            message: 'User sign in is successful',  
            user,
            token
          })
        } else {
          res.status(400).json({
            message: 'ERROR user sign in: incorrect password',
          })
        }
      })
      .catch(err => {
        res.status(404).json({
          message: 'ERROR find user: user is unable to sign in',
          err
        })
      })
  },
  getProfile: (req,res) => {
    let { _id } = req.decoded;
    User.findById( _id )
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'Get user profile successful',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: get user profile usuccessful',
          err
        })
      })
  },
  deleteUser: (req, res) => {
    let { _id } = req.decoded;
    User.findByIdAndRemove( _id )
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'User deleted',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find user to delete',
          err
        })
      })
  },
  updatePhone: (req, res) => {
    let { _id } = req.decoded;
    let { phone } = req.body;

    User.findByIdAndUpdate( _id, { phone } )
      .exec()
      .then(user => {
        res.status(200).json({
          message: 'User phone updated',
          user
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find user to update phone',
          err
        })
      })
  }

}