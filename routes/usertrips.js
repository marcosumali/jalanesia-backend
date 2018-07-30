const express = require('express')
const userTrips = express.Router()

const {
  findAll, 
  findOne, 
  add,
  deletion,
  findByUser,
  updateStatus,
  updateSentiment,
  updateReview
} = require('../controllers/userTrip.controller')

const { 
  authentication, 
  authorisation
} = require('../middlewares/user.auth')

const { 
  authUserTripReview,
  authUserTripCancel
} = require('../middlewares/userTrip.auth')

const { 
  getRemainingQuota,
  checkQuotaTrip,
  autherror
} = require('../middlewares/trip.auth')


userTrips
  .get('/', findAll)
  .get('/byId', authentication, authorisation, autherror, findOne)
  .get('/byUser', authentication, authorisation, autherror, findByUser)
  .post('/', authentication, authorisation, getRemainingQuota, checkQuotaTrip, autherror, add)
  .put('/status', updateStatus)
  .put('/sentiment', authentication, authorisation, authUserTripReview, autherror, updateSentiment)
  .put('/review', authentication, authorisation, authUserTripReview, autherror, updateReview)
  .delete('/', authentication, authorisation, authUserTripCancel, autherror, deletion)


module.exports = userTrips