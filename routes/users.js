const express = require('express')
const { findAll, findOne, add, deletion, signIn, getProfile, deleteUser, updatePhone } = require('../controllers/user.controller')
const { authentication, authorisation } = require('../middlewares/user.auth')

const users = express.Router()

// need to add update, login, logout, addComment, fblogin, g+ login, twitter login

users
  .get('/', findAll)                                                          // GET all users (admin role only) - admin not yet prepared
  .get('/profile', authentication, authorisation, getProfile)                 // GET user profile (admin role and related user only)
  .post('/', add)                                                             // POST new user (register)
  .post('/signin', signIn)                                                    // POST user verification to get token (sign in)
  .put('/updatePhone', authentication, authorisation, updatePhone)            // PUT update user phone
  .delete('/delete', authentication, authorisation, deleteUser)               // DELETE user profile
  // .get('/:id', findOne)                                                    // redundant with getProfile
  // .delete('/:id', deletion)                                                // redundant with delete

module.exports = users