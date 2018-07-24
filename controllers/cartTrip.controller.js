const CartTrip = require('../models/CartTrip')

module.exports = {
  findAll: (req, res) => {
    CartTrip.find()
      .populate({ path: 'cartId', select: '-userId' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(carttrips => {
        res.status(200).json({
          message: 'All Cart Trips retrieved',
          carttrips
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch Cart Trips',
          err
        })
      })
  },
  findOne: (req, res) => {
    let { id } = req.query
    CartTrip.findById(id)
      .populate({ path: 'cartId', select: '-userId' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(cartTrip => {
        res.status(200).json({
          message: 'Single Cart Trip retrieved',
          cartTrip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch Cart Trip by id',
          err
        })
      })
  },
  add: (req, res) => {
    let { _id } = req.cart // Cart Id for related User
    let { tripId, quantity } = req.body
    CartTrip.create({
      cartId: _id,
      tripId,
      quantity,
    })
      .then(cartTrip => {
        res.status(200).json({
          message: 'New Cart Trip added successfully',
          cartTrip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to add Cart Trip',
          err
        })
      })
  },
  deletion: (req, res) => {
    let { _id } = req.cart // Cart Id for related User
    CartTrip.findOneAndRemove({ cartId: _id })
      .populate({ path: 'cartId', select: '-userId' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(cartTrip => {
        res.status(200).json({
          message: 'Cart Trip deleted successfully',
          cartTrip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete Cart Trip',
          err
        })
      })
  },
  findByUser: (req, res) => {
    let { _id } = req.cart // Cart Id for related User
    CartTrip.find({ cartId: _id })
      .populate({ path: 'cartId', select: '-userId' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(cartTrip => {
        res.status(200).json({
          message: 'Get Cart Trip by userId successful',
          cartTrip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find Cart Trip by userId',
          err
        })
      })


  }

}