const express = require('express')
const { findAll, findOne, add, deletion, getProfile, deleteSupplier } = require('../controllers/supplier.controller')
const { authentication, authorisation } = require('../middlewares/user.auth')

const supplier = express.Router()

supplier
  .get('/', findAll)                                                       // GET all supplier (admin role only) - admin not yet prepared
  .get('/profile', authentication, authorisation, getProfile)              // GET all supplier (admin role only) - admin not yet prepared
  .post('/', add)                                                          // POST new supplier (register)
  .delete('/delete', authentication, authorisation, deleteSupplier)        // DELETE supplier profile
  // .delete('/:id', deletion)
  // .get('/:id', findOne)
  
module.exports = supplier