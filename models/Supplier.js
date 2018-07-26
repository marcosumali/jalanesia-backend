const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema
const saltRounds = Number(process.env.SALTROUNDS)

const supplierSchema = new Schema({
  name: { 
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },  
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
  businessType: String,
  npwp: String,
  personalId: {
    type: String,
    unique: true
  },
  social: {
    instagram: String,
    facebook: String,
  },
  phone: [String],
  address: String,

  // trips: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Trip'
  // }], // TO BE DELETED

  companyAvatar: String
}, {
  timestamps: true
})

// hooks for hashing password
supplierSchema.pre('save', function (next) { 
  let supplier = this
  bcrypt.hash(supplier.password, saltRounds, function (err, hash) {
    if (err) return next(err)
    supplier.password = hash
    next()
  })
})

supplierSchema.pre('update', function (next) {
  let supplier = this
  if (supplier._update.$set.password){
    bcrypt.genSalt(saltRounds, function (err, salt){
      if (err) return next(err)
      bcrypt.hash(supplier._update.$set.password, salt, function (err, hash){
        if (err) return next(err)
        supplier._update.$set.password = hash
        next()
      })
    })
  } else {
      next()
  }
})


module.exports = mongoose.model('Supplier', supplierSchema)