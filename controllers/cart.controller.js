const Cart = require('../models/Cart')

module.exports = {
  findAll: (req, res) => {
    Cart.find()
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .exec()
      .then(carts => {
        res.status(200).json({
          message: 'All carts retrieved',
          carts
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch carts',
          err
        })
      })
  },
  findOne: (req, res) => {
    let { id } = req.query
    Cart.findById(id)
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .exec()
      .then(cart => {
        res.status(200).json({
          message: 'Single Cart retrieved',
          cart
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch Cart by id',
          err
        })
      })
  },
  add: (req, res) => {
    let { _id } = req.decoded // User Id
    Cart.create({
      userId: _id,
    })
      .then(cart => {
        res.status(200).json({
          message: 'New cart added successfully',
          cart
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to add Cart',
          err
        })
      })
  },
  deletion: (req, res) => {
    let id = req.decoded._id // User Id
    Cart.findOneAndRemove({ userId: id })
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .exec()
      .then(cart => {
        res.status(200).json({
          message: 'Cart deleted successfully',
          cart
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to delete Cart',
          err
        })
      })
  },
  findByUser: (req, res) => {
    let { _id }  = req.decoded
    Cart.find({ userId: _id })
      .populate({ path: 'userId', select: '-_id firstName lastName email' })
      .exec()
      .then(cart => {
        res.status(200).json({
          message: 'Get Cart by userId successful',
          cart
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to find Cart by userId',
          err
        })
      })


  }

}