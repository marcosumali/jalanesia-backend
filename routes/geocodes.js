const express = require('express')
const geocodes = express.Router()
const { 
  provinceCheckAll,
  provinceSaveAll,
  provinceGetAll,
  cityCheckAll,
  citySaveAll,
  cityGetAll
} = require('../controllers/geocode/geocode.controller')

geocodes
  .get('/province', provinceGetAll)
  .get('/province/check', provinceCheckAll)
  .get('/province/saveAll', provinceSaveAll)
  .get('/city', cityGetAll)
  .get('/city/check', cityCheckAll)
  .get('/city/saveAll', citySaveAll)  


module.exports = geocodes