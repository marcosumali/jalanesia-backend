const express = require('express')
const users = express.Router()

const {
  findAll, 
  findOne, 
  add, 
  deletion, 
  signIn, 
  getProfile, 
  deleteUser, 
  updatePhone, 
  updateCityOrigin,
  updateProfile,
  updateAvatar,
  updatePassword,
  getAvatarNext
} = require('../controllers/user.controller')

const { 
  authentication, 
  authorisation,
  autherror
} = require('../middlewares/user.auth')

const {
  getPublicUrl,
  sendUploadToGCS,
  multer,
  deleteFileOnGCS
} = require('../middlewares/gcp')

// need to add update, login, logout, addComment, fblogin, g+ login, twitter login

users
  .get('/', findAll)
  .get('/profile', authentication, authorisation, autherror, getProfile)
  .post('/', add)
  .post('/signIn', signIn)
  .put('/', authentication, authorisation, autherror, updateProfile)
  .put('/updatePhone', authentication, authorisation, autherror, updatePhone)
  .put('/updateCity', authentication, authorisation, autherror, updateCityOrigin)
  .put('/updatePassword', authentication, authorisation, autherror, updatePassword)
  .put('/updateAvatar', authentication, authorisation, getAvatarNext, multer.single('image'), deleteFileOnGCS, sendUploadToGCS, autherror, updateAvatar)
  .delete('/delete', authentication, authorisation, autherror, deleteUser)
  
  // .get('/:id', findOne)                                                    // redundant with getProfile
  // .delete('/:id', deletion)                                                // redundant with delete


module.exports = users