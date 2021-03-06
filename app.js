require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000
const MLABUser = process.env.MLABADMIN
const MLABPassword = process.env.MLABUSERPASS 
const db = mongoose.connection
const dbURL = 'mongodb://localhost:27017/jalanesia'
const mongodbURL = `mongodb://${MLABUser}:${MLABPassword}@ds147659.mlab.com:47659/server-trips`

const index = require('./routes/index')
const users = require('./routes/users')
const suppliers = require('./routes/suppliers')
const trips = require('./routes/trips')
const usertrips = require('./routes/usertrips')
const geocodes = require('./routes/geocodes')
const carts = require('./routes/carts')
const carttrips = require('./routes/carttrips')
const categories = require('./routes/categories')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

mongoose.connect(mongodbURL, err => {
  (!err) ? console.log('Connected to database!') : console.log('Error connecting to database')
})

app.use('/', index)
app.use('/users', users)
app.use('/suppliers', suppliers)
app.use('/trips', trips)
app.use('/usertrips', usertrips)
app.use('/geocodes', geocodes)
app.use('/carts', carts)
app.use('/carttrips', carttrips)
app.use('/categories', categories)

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))