const Supplier = require('../models/Supplier')

module.exports = {
  findAll: (req, res) => {
    Supplier.find()
      .exec()
      .then(suppliers => {
        res.status(200).json({
          message: 'all suppliers retrieved',
          suppliers
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to fetch suppliers',
          err
        })
      })
  },
  findOne: (req, res) => {
    Supplier.findById(req.params.id)
      .populate('Trip')
      .exec()
      .then(supplier => {
        res.status(200).json({
          message: 'supplier profile retrieved',
          supplier
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to fetch supplier profile',
          err
        })
      })
  },
  add: (req, res) => {
    console.log(req.body)
    Supplier.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      businessType: req.body.businessType,
      npwp: req.body.npwp || '',
      personalId: req.body.personalId,
      social: {
        instagram: req.body.social.instagram,
        facebook: req.body.social.facebook
      },
      phone: req.body.phone,
      address: req.body.address
    })
      .then(supplier => {
        res.status(200).json({
          message: 'new supplier created',
          supplier
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to create supplier',
          err
        })
      })
  },
  deletion: (req, res) => {
    Supplier.findByIdAndRemove(req.params.id)
      .exec()
      .then(supplier => {
        res.status(200).json({
          message: 'supplier removed',
          supplier
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'unable to remove supplier',
          err
        })
      })
  }
}