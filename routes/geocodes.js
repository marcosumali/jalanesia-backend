const express = require('express')
const geocodes = express.Router()
const { 
  provinceCheckAll,
  provinceSaveAll,
  provinceGetAll,
  cityCheckAll,
  citySaveAll,
  cityGetAll,
  getCity,
  getCityByIsland,
} = require('../controllers/geocode/geocode.controller')

geocodes
  .get('/province', provinceGetAll)
  .get('/province/check', provinceCheckAll)
  .get('/province/saveAll', provinceSaveAll)
  .get('/city', cityGetAll)
  .get('/city/check', cityCheckAll)
  .get('/city/saveAll', citySaveAll)
  .get('/city/byName', getCity)
  .get('/city/byIsland', getCityByIsland)  


module.exports = geocodes