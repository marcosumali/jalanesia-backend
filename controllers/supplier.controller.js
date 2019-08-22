const Supplier = require('../models/Supplier')
const Trip = require('../models/Trip')
const UserTrip = require('../models/UserTrip')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const privateKey = 'katakunci'

module.exports = {
  findAll: (req, res) => {
    Supplier.find()
      .exec()
      .then(suppliers => {
        res.status(200).json({
          message: 'All suppliers retrieved',
          suppliers
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch suppliers',
          err
        })
      })
  },
  // findOne: (req, res) => {
  //   Supplier.findById(req.params.id)
  //     .populate('Trip')
  //     .exec()
  //     .then(supplier => {
  //       res.status(200).json({
  //         message: 'upplier profile retrieved',
  //         supplier
  //       })
  //     })
  //     .catch(err => {
  //       res.status(400).json({
  //         message: 'ERROR: unable to fetch supplier profile',
  //         err
  //       })
  //     })
  // },
  add: (req, res) => {
    let { name, username, email, password, businessType, npwp, personalId, social, phone, address } = req.body
    if (!social) {
      social = {
        instagram: '',
        facebook: ''
      }
    }

    Supplier.create({
      name,
      username,
      email,
      password,
      personalId,
      businessType: businessType || '',
      npwp: npwp || '',
      social: {
        instagram: social.instagram,
        facebook: social.facebook
      },
      phone, // Array of strings
      address: address || ''
    })
      .then(supplier => {
        let supplierJwt = { _id: supplier._id , name: supplier.name, username: supplier.username, email: supplier.email }
        let token = jwt.sign(supplierJwt, privateKey)
        res.status(200).json({
          message: 'New supplier created',
          supplier,
          token
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to create supplier',
          err
        })
      })
  },
  // deletion: (req, res) => {
  //   Supplier.findByIdAndRemove(req.params.id)
  //     .exec()
  //     .then(supplier => {
  //       res.status(200).json({
  //         message: 'supplier removed',
  //         supplier
  //       })
  //     })
  //     .catch(err => {
  //       res.status(400).json({
  //         message: 'unable to remove supplier',
  //         err
  //       })
  //     })
  // },
  getProfile: (req, res) => {
    let { _id } = req.decoded
    Supplier.findById( _id )
      .exec()
      .then(supplier => {
        res.status(200).json({
          message: 'Get supplier profile successful',
          supplier
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable ger supplier profile',
          err
        })
      })
  },
  deleteSupplier: (req, res) => {
    let { _id } = req.decoded
    Supplier.findByIdAndRemove( _id )
      .then(supplier => {
        res.status(200).json({
          message: 'Supplier deleted',
          supplier
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find supplier',
          err
        })
      })
  },
  updatePhone: (req, res) => {
    let { _id } = req.decoded
    let { phone } = req.body
    Supplier.findById( _id )
      .then(supplier => {
        let newPhone = supplier.phone
        newPhone.push(phone)
        Supplier.findByIdAndUpdate(_id, {
          phone: newPhone
        })
          .then(updatedSupplier => {
            res.status(200).json({
              message: 'Supplier phone updated',
              updatedSupplier
            })
          })
          .catch(err => {
            res.status(400).json({
              message: 'ERROR: unable to update supplier phone',
              err
            })
          })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find supplier',
          err
        })
      })
  },
  updateProfile: (req, res) => {
    let { _id } = req.decoded;
    let { name, username, email, password, businessType, npwp, personalId, social, phone, address } = req.body
    if (!social) {
      social = {
        instagram: '',
        facebook: ''
      }
    }

    Supplier.update({ _id }, { $set: {
      name,
      username,
      email,
      password,
      personalId,
      businessType: businessType || '',
      npwp: npwp || '',
      social: {
        instagram: social.instagram,
        facebook: social.facebook
      },
      phone, // Array of strings
      address: address || ''
    }})
      .then(supplier => {
        res.status(200).json({
          message: 'Supplier profile updated',
          supplier,
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to update supplier profile',
          err
        })
      })
  },
  signIn: (req, res) => {
    let { email, password } = req.body
    
    Supplier.findOne({ email })
      .exec()
      .then(supplier => {
        let checkHash = bcrypt.compareSync(password, supplier.password); // true or false
        if (checkHash == true) {
          let supplierJwt = { _id: supplier._id, firstName: supplier.firstName, lastName: supplier.lastName, email: supplier.email }
          let token = jwt.sign(supplierJwt, privateKey)
          res.status(200).json({
            message: 'Supplier sign in is successful',  
            supplier,
            token
          })
        } else {
          res.status(400).json({
            message: 'ERROR: incorrect password',
          })
        }
      })
      .catch(err => {
        res.status(404).json({
          message: 'ERROR: find supplier to sign-in',
          err
        })
      })
  },
  getStatistics: (req, res) => {
    let { id } = req.query

    Trip.find({ supplierId: id })
      .then(async trips => {
        let positiveTrips = []
        let negativeTrips = []
        let neutralTrips = []
        let oneStarTrips = []
        let twoStarTrips = []
        let threeStarTrips = []
        let fourStarTrips = []
        let fiveStarTrips = []
        let totalStar = 0
        let totalLengthStar = 0

        await Promise.all(trips.map(async (trip, index) => {
          await UserTrip.find({ tripId: trip._id })
            .then(async userTrips => {

              await Promise.all(userTrips.map((userTrip, index) => {
                if (userTrip.sentiment === "positive") {
                  positiveTrips.push(userTrip)
                } else if (userTrip.sentiment === "negative") {
                  negativeTrips.push(userTrip)
                } else if (userTrip.sentiment === "neutral") {
                  neutralTrips.push(userTrip)
                }

                if (userTrip.score === 1) {
                  oneStarTrips.push(userTrip)
                  totalStar += 1
                  totalLengthStar += 1
                } else if (userTrip.score === 2) {
                  twoStarTrips.push(userTrip)
                  totalStar += 2
                  totalLengthStar += 1
                } else if (userTrip.score === 3) {
                  threeStarTrips.push(userTrip)
                  totalStar += 3
                  totalLengthStar += 1
                } else if (userTrip.score === 4) {
                  fourStarTrips.push(userTrip)
                  totalStar += 4
                  totalLengthStar += 1
                } else if (userTrip.score === 5) {
                  fiveStarTrips.push(userTrip)
                  totalStar += 5
                  totalLengthStar += 1
                }
              }))
            })
            .catch(err => {
              res.status(404).json({
                message: 'ERROR: find history based on user trip Id',
                err
              })
            })
        }))

        await res.status(200).json({
          message: 'Get supplier statistics successful',
          positiveTrips,
          negativeTrips,
          neutralTrips,
          oneStarTrips,
          twoStarTrips,
          threeStarTrips,
          fourStarTrips,
          fiveStarTrips,
          averageStar: totalStar / totalLengthStar
        })

      })
      .catch(err => {
        res.status(404).json({
          message: 'ERROR: find trip based on supplier Id',
          err
        })
      })

    

  }

}