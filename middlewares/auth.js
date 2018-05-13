const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = {
  authentication: (req, res, next) => {
    let token = req.headers.authkey;
    if (!token) {
      let err = new Error('You are not authenticated yet, please login !')
      next(err)
    } else {
      let decoded = jwt.decode(token);
      req.decoded = decoded; // result: id, firstName, lastName, email
      next()
    }
  },
  authorisation: (req, res, next) => {
    let { _id } = req.decoded;  
    User.findById(_id)
      .exec()
      .then(user => {
        next()
      })
      .catch(err => {
        let error = new Error('You are not authorised !')
        next(error)
      })
  },
  autherror: (err, req, res, next) => {
    if (err) {
      let indexEx = err.stack.indexOf('!')
      let errMessage = err.stack.slice(0,indexEx+1)
      res.status(403).json({
          message: errMessage,
          err
      })
    } else {
      next();
    }
  } 

}