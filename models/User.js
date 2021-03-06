const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema
const saltRounds = Number(process.env.SALTROUNDS)

const userSchema = new Schema({
  firstName: {
    type: String,
    // required: true
  },
  lastName: {
    type: String,
    // required: true
  },
  dob: {
    type: Date,
    // required: true
  },
  gender: {
    type: String,
    // required: true
  },
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
  
  // trip: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Trip'
  // }],  // TO BE DELETED
  // wishlist: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Trip'
  // }],  // TO BE DELETED
  // history: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Trip'
  // }],  // TO BE DELETED

  // optionals
  cityOriginId: {
    type: Schema.Types.ObjectId,
    ref: 'City',
  },
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