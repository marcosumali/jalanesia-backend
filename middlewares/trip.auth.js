const Trip = require('../models/Trip');
const UserTrip = require('../models/UserTrip');



module.exports = {
  getRemainingQuota: (req, res, next) => {
    let { tripId } = req.query // trip Id

    UserTrip.find({ tripId })
      .then(async userTrips => {
        let userList = {
          participant: 0,
          waitingList: 0
        }
        userTrips.map((userTrip, index) => {
          if (userTrip.status === 'payment confirmed') {
            userList.participant += userTrip.quantity
          } else if (userTrip.status === 'awaiting payment') {
            userList.waitingList += userTrip.quantity
          }
        })
        req.userList = userList
        next()
      })
      .catch(err => {
        let error = new Error('Your trip Id is not found !')
        next(error)
      })
  },
  checkQuotaTrip: (req, res, next) => {
    let { tripId } = req.query // trip Id
    let { quantity } = req.body
    let { participant } = req.userList

    Trip.findOne({ _id: tripId })
      .then(trip => {
        let availableSeats = trip.quota - participant
        // console.log(trip.quota, quantity, participant, availableSeats)
        if (availableSeats >= Number(quantity)) {
          next()
        } else {
          let error = new Error('Quantity is more then available seats on trip !')
          next(error)
        }
      })
      .catch(err => {
        let error = new Error('Your trip Id is not found !')
        next(error)
      })
  },
  deductQuota: (req, res, next) => {
    let { tripId, quantity } = req.body

    Trip.findOne({ _id: tripId })
      .then(trip => {
        let newQuota = trip.quota - quantity
        if (trip.status === 'payment confirmed') {
          Trip.findByIdAndUpdate({ _id: tripId }, { quota: newQuota })
            .then(trip => {
              next()
            })
            .catch(err => {
              let error = new Error('Your trip Id is not found to be updated  !')
              next(error)
            })
        } else {
          let error = new Error('Your trip payment not yet confirmed  !')
          next(error)  
        }
      })
      .catch(err => {
        let error = new Error('Your trip Id is not found !')
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