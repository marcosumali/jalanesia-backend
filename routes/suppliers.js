const express = require('express')
const supplier = express.Router()

const { 
  findAll, 
  findOne, 
  add, 
  deletion, 
  getProfile, 
  deleteSupplier,
  updatePhone,
  updateProfile,
  signIn,
  getStatistics
} = require('../controllers/supplier.controller')

const { 
  authentication, 
  authorisation 
} = require('../middlewares/supplier.auth')


supplier
  .get('/', findAll)                                                       // GET all supplier (admin role only) - admin not yet prepared
  .get('/profile', authentication, authorisation, getProfile)              
  .get('/statistics', getStatistics)
  .post('/', add)                                                          // POST new supplier (register)
  .post('/signIn', signIn)
  .put('/', authentication, authorisation, updateProfile)
  .put('/phone', authentication, authorisation, updatePhone)
  .delete('/delete', authentication, authorisation, deleteSupplier)        // DELETE supplier profile

  // .delete('/:id', deletion)
  // .get('/:id', findOne)
  

module.exports = supplier