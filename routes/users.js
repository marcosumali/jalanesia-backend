const express = require('express')
const users = express.Router()
const { findAll, findOne, add, deletion } = require('../controllers/user.controller')

// need to add update, login, logout, addComment, fblogin, g+ login, twitter login

users
  .post('/', add)
  .get('/', findAll)
  .get('/:id', findOne)
  .delete('/:id', deletion)

module.exports = users