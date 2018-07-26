const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const privateKey = process.env.PRIVATEKEY

module.exports = {
  findAll: (req, res) => {
    User.find()
      .populate({ path: 'cityOriginId', select: '-_id' })
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
  // findOne: (req, res) => {
  //   User.findById(req.params.id)
  //     .exec()
  //     .then(user => {
  //       res.status(200).json({
  //         message: 'User profile retrieved',
  //         user
  //       })
  //     })
  //     .catch(err => {
  //       res.status(400).json({
  //         message: 'ERROR: unable to fetch user profile',
  //         err
  //       })
  //     })
  // },
  add: (req, res) => {
    let { firstName, lastName, dob, gender, phone, email, password, cityOriginId, avatarUrl } = req.body
    User.create({
      // input field here
      firstName: firstName || '',
      lastName: lastName || '',
      dob: dob || '',
      gender: gender || '',
      phone: phone || '',
      email,
      password,
      cityOriginId: cityOriginId || '111111111111111111111111',
      avatarUrl: avatarUrl || '', 
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
  // deletion: (req, res) => {
  //   User.findByIdAndRemove(req.params.id)
  //     .exec()
  //     .then(user => {
  //       res.status(200).json({
  //         message: 'User deleted',
  //         user
  //       })
  //     })
  //     .catch(err => {
  //       res.status(400).json({
  //         message: 'ERROR: unable to delete user',
  //         err
  //       })
  //     })
  // },
  signIn: (req, res) => {
    let { email, password } = req.body
    User.findOne({ email })
      .populate({ path: 'cityOriginId', select: '-_id' })
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
      .populate({ path: 'cityOriginId', select: '-_id' })
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
      .populate({ path: 'cityOriginId', select: '-_id' })
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
      .populate({ path: 'cityOriginId', select: '-_id' })
      .exec()
      .then(updatedUser => {
        res.status(200).json({
          message: 'User phone updated',
          updatedUser
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find user to update phone',
          err
        })
      })
  },
  updateCityOrigin: (req, res) => {
    let { _id } = req.decoded;
    let { cityOriginId } = req.body;

    User.findByIdAndUpdate( _id, { cityOriginId } )
      .populate({ path: 'cityOriginId', select: '-_id' })
      .exec()
      .then(updatedUser => {
        res.status(200).json({
          message: 'User city location updated',
          updatedUser
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find user to update city location',
          err
        })
      })
  },
  updateProfile: (req, res) => {
    let { _id } = req.decoded;
    let { firstName, lastName, dob, gender, phone, email, password, cityOriginId, avatarUrl } = req.body

    User.findByIdAndUpdate( _id, {
      firstName: firstName || '',
      lastName: lastName || '',
      dob: dob || '',
      gender: gender || '',
      phone: phone || '',
      email,
      password,
      cityOriginId: cityOriginId || '111111111111111111111111',
      avatarUrl: avatarUrl || '', 
    })
      .populate({ path: 'cityOriginId', select: '-_id' })
      .exec()
      .then(updatedUser => {
        res.status(200).json({
          message: 'User updated',
          updatedUser,
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR:: unable to update user profile',
          err
        })
      })
  }

}