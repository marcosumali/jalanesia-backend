const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 4000
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const db = mongoose.connection
const dbURL = 'mongodb://localhost:27017/jalanesia'

const index = require('./routes/index')
const users = require('./routes/users')
const suppliers = require('./routes/suppliers')
const trips = require('./routes/trips')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

mongoose.connect(dbURL, err => {
  (!err) ? console.log('Connected to database!') : console.log('Error connecting to database')
})

app.use('/', index)
app.use('/users', users)
app.use('/suppliers', suppliers)
app.use('/trips', trips)

app.listen(PORT, () => console.log(`App is running on port ${PORT}`))