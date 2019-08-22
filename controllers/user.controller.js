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
        let filteredUsers = []
        users.map((user) => {
          let pushedUser = {
            firstname: user.firstName, 
            lastName: user.lastName, 
            dob: user.dob, 
            gender: user.gender, 
            phone: user.phone, 
            email: user.email, 
            cityOriginId: user.cityOriginId, 
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
          filteredUsers.push(pushedUser)
        })
        res.status(200).json({
          message: 'All users retrieved',
          users: filteredUsers
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
        let filteredUser = {
          firstname: user.firstName, 
          lastName: user.lastName, 
          dob: user.dob, 
          gender: user.gender, 
          phone: user.phone, 
          email: user.email, 
          cityOriginId: user.cityOriginId, 
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
        res.status(200).json({
          message: 'New user added',
          user: filteredUser,
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
          let filteredUser = {
            firstname: user.firstName, 
            lastName: user.lastName, 
            dob: user.dob, 
            gender: user.gender, 
            phone: user.phone, 
            email: user.email, 
            cityOriginId: user.cityOriginId, 
            avatarUrl: user.avatarUrl,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
          }
          res.status(200).json({
            message: 'User sign in is successful',  
            user: filteredUser,
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
        let filteredUser = {
          firstname: user.firstName, 
          lastName: user.lastName, 
          dob: user.dob, 
          gender: user.gender, 
          phone: user.phone, 
          email: user.email, 
          cityOriginId: user.cityOriginId, 
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
        res.status(200).json({
          message: 'Get user profile successful',
          user: filteredUser
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
        let filteredUser = {
          firstname: user.firstName, 
          lastName: user.lastName, 
          dob: user.dob, 
          gender: user.gender, 
          phone: user.phone, 
          email: user.email, 
          cityOriginId: user.cityOriginId, 
          avatarUrl: user.avatarUrl,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
        res.status(200).json({
          message: 'User deleted',
          user: filteredUser
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
        let filteredUser = {
          firstname: updatedUser.firstName, 
          lastName: updatedUser.lastName, 
          dob: updatedUser.dob, 
          gender: updatedUser.gender, 
          phone: updatedUser.phone, 
          email: updatedUser.email, 
          cityOriginId: updatedUser.cityOriginId, 
          avatarUrl: updatedUser.avatarUrl,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
        res.status(200).json({
          message: 'User phone updated',
          user: filteredUser
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
        let filteredUser = {
          firstname: updatedUser.firstName, 
          lastName: updatedUser.lastName, 
          dob: updatedUser.dob, 
          gender: updatedUser.gender, 
          phone: updatedUser.phone, 
          email: updatedUser.email, 
          cityOriginId: updatedUser.cityOriginId, 
          avatarUrl: updatedUser.avatarUrl,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
        res.status(200).json({
          message: 'User city location updated',
          user: filteredUser
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
    let { _id } = req.decoded
    let { firstName, lastName, dob, gender, phone, email, cityOriginId, avatarUrl } = req.body

    User.findByIdAndUpdate(_id, {
      firstName,
      lastName,
      dob,
      gender,
      phone,
      email,
      cityOriginId: cityOriginId || '111111111111111111111111',
    })
      .populate({ path: 'cityOriginId', select: '-_id' })
      .exec()
      .then(updatedUser => {
        let filteredUser = { 
          firstname: updatedUser.firstName, 
          lastName: updatedUser.lastName, 
          dob: updatedUser.dob, 
          gender: updatedUser.gender, 
          phone: updatedUser.phone, 
          email: updatedUser.email, 
          cityOriginId: updatedUser.cityOriginId, 
          avatarUrl: updatedUser.avatarUrl,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt
        }
        res.status(200).json({
          message: 'User updated',
          user: filteredUser,
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to update user profile',
          err
        })
      })
  },
  updatePassword: (req, res) => {
    let { _id } = req.decoded
    let { previousPass, newPass } = req.body
    User.findById(_id)
      .then(user => {
        let checkHash = bcrypt.compareSync(previousPass, user.password); // true or false
        if (checkHash === true) {
          User.update({ _id }, { $set: {
            password: newPass, 
          }})
            .populate({ path: 'cityOriginId', select: '-_id' })
            .exec()
            .then(updatedUser => {
              res.status(200).json({
                message: 'User password updated',
                updatedUser,
              })
            })
            .catch(err => {
              res.status(400).json({
                message: 'ERROR: unable to update user password',
                err
              })
            })

        } else {
          res.status(400).json({
            message: 'ERROR: incorrect password',
            err
          })
        }
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find user to check authorisation',
          err
        })
      })
  },
  updateAvatar: (req, res) => {
    let { _id } = req.decoded
    if (req.file) {
      let image = req.file.cloudStoragePublicUrl
  
      User.findByIdAndUpdate(_id, {
        avatarUrl: image
      })
        .populate({ path: 'cityOriginId', select: '-_id' })
        .exec()
        .then(updatedUser => {
          let filteredUser = { 
            firstname: updatedUser.firstName, 
            lastName: updatedUser.lastName, 
            dob: updatedUser.dob, 
            gender: updatedUser.gender, 
            phone: updatedUser.phone, 
            email: updatedUser.email, 
            cityOriginId: updatedUser.cityOriginId, 
            avatarUrl: updatedUser.avatarUrl,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt
          }
          res.status(200).json({
            message: 'User avatar updated',
            user: filteredUser,
            link: image
          })
        })
        .catch(err => {
          res.status(400).json({
            message: 'ERROR: unable to update user profile avatar',
            err
          })
        })
    } else {
      res.status(400).json({
        message: 'ERROR: no file identified'
      })
    }
  },
  getAvatarNext: (req, res, next) => {
    let { _id } = req.decoded;
    User.findById( _id )
      .populate({ path: 'cityOriginId', select: '-_id' })
      .exec()
      .then(user => {
        req.avatarUrl = { avatarUrl: user.avatarUrl }
        next()
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: get user profile next usuccessful',
          err
        })
      })
  }

}