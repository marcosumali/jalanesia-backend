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
    let { tripId } = req.query // trip Id
    let { quantity } = req.body
    CartTrip.find({ tripId })
      .then(trip => {
        if (trip && trip.length !== 0) {
          let addQuantity = trip[0].quantity + 1
          CartTrip.findByIdAndUpdate(trip[0]._id, {
            quantity: addQuantity,
          })
            .populate({ path: 'cartId', select: '-userId' })
            .populate({ path: 'tripId', select: '-_id -supplierId' })
            .exec()
            .then(cartTrip => {
              res.status(200).json({
                message: 'New Cart Trip quantity added successfully',
                cartTrip
              })
            })
            .catch(err => {
              res.status(400).json({
                message: 'ERROR: unable to add qty Cart Trip',
                err
              })
            })
        } else {
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
        }
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find trip Id on Cart Trip',
          err
        })
      })
  },
  updateQty: (req, res) => {
    let { id } = req.query // Cart trip Id
    let { quantity } = req.body
    CartTrip.findByIdAndUpdate(id, {
      quantity,
    })
      .populate({ path: 'cartId', select: '-userId' })
      .populate({ path: 'tripId', select: '-_id -supplierId' })
      .exec()
      .then(cartTrip => {
        res.status(200).json({
          message: 'New Cart Trip updated successfully',
          cartTrip
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to update Cart Trip',
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