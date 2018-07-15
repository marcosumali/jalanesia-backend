const Supplier = require('../models/Supplier')
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
  findOne: (req, res) => {
    Supplier.findById(req.params.id)
      .populate('Trip')
      .exec()
      .then(supplier => {
        res.status(200).json({
          message: 'upplier profile retrieved',
          supplier
        })
      })
      .catch(err => {
        res.status(400).json({
          message: 'ERROR: unable to fetch supplier profile',
          err
        })
      })
  },
  add: (req, res) => {
    // console.log(req.body)
    Supplier.create({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      businessType: req.body.businessType || '',
      npwp: req.body.npwp || '',
      personalId: req.body.personalId,
      social: {
        instagram: '' || req.body.social.instagram,
        facebook: '' || req.body.social.facebook
      },
      phone: req.body.phone,
      address: req.body.address
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
  },
  getProfile: (req, res) => {
    let { _id } = req.decoded;
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
    let { _id } = req.decoded;
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
  }
}