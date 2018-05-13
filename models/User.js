const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const Schema = mongoose.Schema
const saltRounds = 10

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  dob: Date,
  gender: String,
  phone: String,
  email: {
    type: String,
    trim: true,
    unique: true,
    required: 'e-mail address is required',
    validate: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: 'password is required',
  },
  trip: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }],
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }],
  history: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }],
  // optionals
  cityOrigin: String,
  avatarUrl: String,
}, {
  timestamps: true
})

// hooks for hashing password
userSchema.pre('save', function (next) { 
  let user = this
  // async method
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) return next(err)
    user.password = hash
    next()
  })
})

userSchema.pre('update', function (next) {
  let user = this
  if (user._update.$set.password){
    bcrypt.genSalt(saltRounds, function (err, salt){
      if (err) return next(err)
      bcrypt.hash(user._update.$set.password, salt, function (err, hash){
        if (err) return next(err)
        user._update.$set.password = hash
        next()
      })
    })
  } else {
      next()
  }
})

module.exports = mongoose.model('User', userSchema)