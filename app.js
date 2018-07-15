require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const PORT = process.env.PORT || 4000
const db = mongoose.connection
const dbURL = 'mongodb://localhost:27017/jalanesia'
const mongodbURL = 'mongodb://Admin:trip123@ds147659.mlab.com:47659/server-trips'

const index = require('./routes/index')
const users = require('./routes/users')
const suppliers = require('./routes/suppliers')
const trips = require('./routes/trips')
const usertrips = require('./routes/usertrips')

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

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))