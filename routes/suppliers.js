const express = require('express')
const supplier = express.Router()
const { findAll, findOne, add, deletion } = require('../controllers/supplier.controller')

supplier
  .get('/', findAll)
  .get('/:id', findOne)
  .post('/', add)
  .delete('/:id', deletion)
  
module.exports = supplier