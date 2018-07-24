const express = require('express')
const categories = express.Router()

const { 
  findAll, 
  findOne, 
  add,
  deletion,
  update
} = require('../controllers/category.controller')

categories
  .get('/', findAll)
  .get('/by', findOne)
  .post('/', add)
  .put('/', update)
  .delete('/', deletion)


module.exports = categories