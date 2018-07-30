const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserTrip = require('../models/UserTrip');


module.exports = {
  authUserTripReview: (req, res, next) => {
    let { _id }  = req.decoded
    let { id } = req.query

    UserTrip.find({ userId: _id })
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(userTrips => {
        let checkedTrip = {}
        let breakStatus = false
        let checkAuthUser = false
        let checkPaymentStatus = false
        let checkDate = false
        // console.log('before', checkAuthUser, checkPaymentStatus, checkDate)

        userTrips.map((userTrip, index) => {
          if (String(userTrip._id) === id && breakStatus === false) {
            checkAuthUser = true
            breakStatus = true
            checkedTrip = userTrip
          }
        })

        if (checkedTrip.status === 'payment confirmed') {
          checkPaymentStatus = true
        }

        if (checkedTrip.tripId.startDate < new Date(Date.now())) {
          checkDate = true
        }

        console.log('after', checkAuthUser, checkPaymentStatus, checkDate)
        if (checkAuthUser === true && checkPaymentStatus === true && checkDate === true) {
          next()
        } else {
          let error = new Error('You are not authorised to change history !')
          next(error)
        }

      })
      .catch(err => {
        let error = new Error('Your user Id is not found !')
        next(error)
      })
  },
  authUserTripCancel: (req, res, next) => {
    let { _id }  = req.decoded
    let { id } = req.query

    UserTrip.find({ userId: _id })
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(userTrips => {
        let checkedTrip = {}
        let breakStatus = false
        let checkAuthUser = false

        userTrips.map((userTrip, index) => {
          if (String(userTrip._id) === id && breakStatus === false) {
            checkAuthUser = true
            breakStatus = true
            checkedTrip = userTrip
          }
        })

        console.log('after', checkAuthUser)
        if (checkAuthUser === true) {
          next()
        } else {
          let error = new Error('You are not authorised to change history !')
          next(error)
        }

      })
      .catch(err => {
        let error = new Error('Your user Id is not found !')
        next(error)
      })
  },
  autherror: (err, req, res, next) => {
    if (err) {
      let indexEx = err.stack.indexOf('!')
      let errMessage = err.stack.slice(0,indexEx+1)
      res.status(403).json({
          message: errMessage,
          err
      })
    } else {
      next();
    }
  } 

}